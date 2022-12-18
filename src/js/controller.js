import * as model from "./model";
import geoWeatherViewBrief from "./views/geoLocatorViews/geoWeatherViewBrief";
import geoWeatherViewHourly from "./views/geoLocatorViews/geoWeatherViewHourly";
import geoWeatherViewDaily from "./views/geoLocatorViews/geoWeatherViewDaily";
import geoWeatherViewUv from "./views/geoLocatorViews/geoWeatherViewUv";
import geoWeatherViewPrec from "./views/geoLocatorViews/geoWeatherViewPrec";
import geoWeatherViewRealFl from "./views/geoLocatorViews/geoWeatherViewRealFl";
import geoWeatherViewHumidity from "./views/geoLocatorViews/geoWeatherViewHumidity";
import geoWeatherViewVisibility from "./views/geoLocatorViews/geoWeatherViewVisibility";
import geoWeatherViewSunstate from "./views/geoLocatorViews/geoWeatherViewSunstate";
import geoWeatherViewWindDirec from "./views/geoLocatorViews/geoWeatherViewWindDirec";
import geoWeatherViewPressure from "./views/geoLocatorViews/geoWeatherViewPressure";
import geoWeatherViewMap from "./views/geoLocatorViews/geoWeatherViewMap";
import geoWeatherViewMain from "./views/geoLocatorViews/geoWeatherViewMain";
import searchWeatherView from "./views/searchViews/searchWeatherView";
import "core-js";
import "regenerator-runtime/runtime";
import { API_CONFIG } from "./config";

const geoLocatedWeatherController = async function () {
  try {
    // 0. get the id
    let id = window.location.hash.slice(1);
    if (!id) return;
    // 0.5 get current weather data from model
    await model.loadWeather(id);
    // 1. render the brief data
    geoWeatherViewBrief._render(model.state.briefWeather);
    // 2. render the hourly data
    geoWeatherViewHourly._render(model.state.hourlyWeather);
    // 3. render the daily data
    geoWeatherViewDaily._render(model.state.dailyWeather);
    // 4. render the uv data
    geoWeatherViewUv._render(model.state.uvLevels);
    // 5. render precipitation data
    geoWeatherViewPrec._render(model.state.precipitationLevel);
    // 6. render realfeel data
    geoWeatherViewRealFl._render(model.state.realFeel);
    // 7. render humidity data
    geoWeatherViewHumidity._render(model.state.humidity);
    // 8. render visibility data
    geoWeatherViewVisibility._render(model.state.visibility);
    // 9. render sunstate data
    geoWeatherViewSunstate._render(model.state.sunState);
    // 10. render winddirection data
    geoWeatherViewWindDirec._render(model.state.windDirection);
    // 11. render pressure data
    geoWeatherViewPressure._render(model.state.pressure);
    // 12. render the map
    geoWeatherViewMap._render(model.state.location);
  } catch (error) {
    alert(error);
  }
};

const searchWeatherController = async function (e) {
  try {
    e.preventDefault();
    // 1. Check if submit value is valid
    if (searchWeatherView._getSearchTerm().length === 0) return;
    // 2. Add loading animation
    searchWeatherView._addSearchAnimation();
    // 3. RE-render everything
    await model.searchWeather(searchWeatherView._getSearchTerm());
    // 4. Clear the text
    searchWeatherView._clearText();
  } catch (err) {
    alert(err);
  }
};
const init = function () {
  geoWeatherViewMain._addHandlerGeoWeather(geoLocatedWeatherController);
  searchWeatherView._addHandlerSearchWeather(searchWeatherController);
};
(() => init())();
const geoPositionController = function (pos) {
  const { latitude, longitude } = pos.coords;
  window.location.hash = `latitude=${latitude}&longitude=${longitude}&${API_CONFIG}`;
};
const getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoPositionController);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
if (window.location.hash.length < 40) (() => getLocation())();
