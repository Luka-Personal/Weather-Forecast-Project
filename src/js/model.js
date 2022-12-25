import { GET_JSON } from "./helpers";
import { API_URL_WEATHER } from "./config";
import { API_URL_CITY } from "./config";
import { API_KEY_CITY } from "./config";
import { API_URL_SEARCH_CITY } from "./config";
import { API_KEY_SEARCH_CITY } from "./config";
import { API_CONFIG } from "./config";
import { weatherCodes } from "./weatherCodes";
import { HOURLY_DATA_END } from "./config";

export const state = {
  hourlyWeather: {},
  dailyWeather: {},
  briefWeather: {},
  uvLevels: {},
  precipitationLevel: {},
  realFeel: {},
  humidity: {},
  visibility: {},
  sunState: {},
  windDirection: {},
  pressure: {},
  positionUser: {},
  location: {},
  searchLoc: {},
};

export const loadWeather = async function (pos) {
  try {
    // ################################################################################################################
    // 0. Getting data
    const data = await GET_JSON(`${API_URL_WEATHER}${pos}`);
    if (!state.searchLoc.latitude || !state.searchLoc.longitude) {
      const urlSplit = window.location.hash.split(`&`);
      const searchTerm = urlSplit.slice(-1)[0];
      if (urlSplit.length >= 9) await searchWeather(searchTerm);
    }
    const dataCity = await GET_JSON(`${API_URL_CITY}lat=${state.searchLoc.latitude ? state.searchLoc.latitude : data.latitude}&lon=${state.searchLoc.longitude ? state.searchLoc.longitude : data.longitude}${API_KEY_CITY}`);
    // hack that on back btn click city names get refreshedß
    delete state.searchLoc.latitude;
    delete state.searchLoc.longitude;
    // ################################################################################################################
    // 0.5 Making lat/lon object
    state.location.longitude = state.searchLoc.longitude ? state.searchLoc.longitude : data.longitude;
    state.location.latitude = state.searchLoc.latitude ? state.searchLoc.latitude : data.latitude;
    // ################################################################################################################
    // 1. Making brief weather object
    state.briefWeather = data.current_weather;
    state.briefWeather.tempMax = data.daily.temperature_2m_max[0];
    state.briefWeather.tempMin = data.daily.temperature_2m_min[0];
    state.briefWeather.weather = weatherCodes[`${data.current_weather.weathercode}`];
    state.briefWeather.currentCity = dataCity.features[0].properties.city || dataCity.features[0].properties.county;
    // ################################################################################################################
    // 2. Making daily weather object
    state.dailyWeather.tempMax = data.daily.temperature_2m_max;
    state.dailyWeather.tempMin = data.daily.temperature_2m_min;
    state.dailyWeather.time = data.daily.time;
    state.dailyWeather.weather = data.daily.weathercode.map((el) => weatherCodes[`${el}`]);
    // ################################################################################################################
    // 3. Making hourly weather object
    // here we basically compare the times to get `now` as a first card in hourly weather container
    const nowIndexTime = data.hourly.time.findIndex((date) => {
      const userFullDate = new Date().toLocaleString(`en-US`, { timeZone: `${data.timezone}` });
      const userHourTimezoned = new Date(userFullDate).getHours();
      const userDate = new Date(userFullDate).getDate();
      const apiHour = new Date(date).getHours();
      const apiDate = new Date(date).getDate();
      return userHourTimezoned === apiHour && userDate === apiDate;
    });
    state.hourlyWeather.title = weatherCodes[`${data.daily.weathercode[0]}`];
    state.hourlyWeather.tempCurr = data.hourly.temperature_2m.slice(nowIndexTime, HOURLY_DATA_END);
    state.hourlyWeather.windSpeed = Math.max(...data.hourly.windspeed_10m.slice(nowIndexTime, HOURLY_DATA_END));
    state.hourlyWeather.weather = data.hourly.weathercode.slice(nowIndexTime, HOURLY_DATA_END).map((el) => weatherCodes[`${el}`]);
    state.hourlyWeather.time = data.hourly.time.slice(nowIndexTime, HOURLY_DATA_END);
    state.hourlyWeather.time[0] = `Now`;
    // ################################################################################################################
    // 4. Making uvIndex object
    let endIndexTime = data.hourly.time.findLastIndex((date) => {
      const dateTimezoned = new Date().toLocaleString(`en-US`, { timeZone: `${data.timezone}` });
      new Date(dateTimezoned).getDate() === new Date(date).getDate();
    });
    if (nowIndexTime === endIndexTime) endIndexTime++;
    state.uvLevels.uvHourly = data.hourly.diffuse_radiation.slice(nowIndexTime, endIndexTime);
    state.uvLevels.uvIndexAvg = data.hourly.diffuse_radiation.slice(nowIndexTime, endIndexTime).reduce((acc, curr) => acc + curr) / data.hourly.diffuse_radiation.slice(nowIndexTime, endIndexTime).length / 25;
    // ################################################################################################################
    // 5. Making precipitation object precipitation_sum
    const firstPrecIndex = data.daily.precipitation_sum.findIndex((el) => el > 0);
    state.precipitationLevel.precSumDaily = data.daily.precipitation_sum;
    state.precipitationLevel.firstPrec = data.daily.precipitation_sum[firstPrecIndex];
    state.precipitationLevel.firstPrecDate = data.daily.time[firstPrecIndex];
    state.precipitationLevel.isExpectedRain = data.daily.precipitation_sum.some((dayPrec) => dayPrec > 0);
    // 6. Making realfeel object
    state.realFeel.realFeelTemp = data.hourly.apparent_temperature[nowIndexTime];
    state.realFeel.isWindy = data.hourly.windspeed_10m.slice(nowIndexTime, endIndexTime).every((windspeed) => windspeed > 0);
    // 7. Making humidity object
    state.humidity.relativeHumidity = data.hourly.relativehumidity_2m[nowIndexTime];
    state.humidity.dewpoint = data.hourly.dewpoint_2m[nowIndexTime];
    // 8. Making visbility object
    state.visibility.actualVisibility = data.hourly.visibility[nowIndexTime];
    // 9. Making sunstate object
    const sunriseHour = new Date(data.daily.sunrise[0]).getHours() || ``;
    const sunriseMinutes = new Date(data.daily.sunrise[0]).getMinutes() || ``;
    const sunsetHour = new Date(data.daily.sunset[0]).getHours() || ``;
    const sunsetMinutes = new Date(data.daily.sunset[0]).getMinutes() || ``;
    state.sunState.sunRise = data.daily.sunrise;
    state.sunState.sunSet = data.daily.sunset;
    state.sunState.formattedSunrise = `${sunriseHour.toString().padStart(2, 0)}:${sunriseMinutes.toString().padStart(2, 0)}`;
    state.sunState.formattedSunset = `${sunsetHour.toString().padStart(2, 0)}:${sunsetMinutes.toString().padStart(2, 0)}`;
    // 10. Making wind direction object
    state.windDirection.windDirectDeg = data.hourly.winddirection_10m[nowIndexTime];
    state.windDirection.windSpeed = data.hourly.windspeed_10m[nowIndexTime];
    // 11. Makinf pressure object
    state.pressure.mslPressure = data.hourly.pressure_msl[nowIndexTime];
    return state;
  } catch (err) {
    throw err;
  }
};
export const searchWeather = async function (sTerm) {
  try {
    // ################################################################################################################
    // 1. Get data
    const search = await GET_JSON(`${API_URL_SEARCH_CITY}text=${sTerm}${API_KEY_SEARCH_CITY}`);
    if (search.features.length < 1) throw Error(`NOT FOUND!`);
    // ################################################################################################################
    // 2. Make search object
    const lat = search.features[0].properties.lat;
    const lon = search.features[0].properties.lon;
    state.searchLoc.longitude = lon;
    state.searchLoc.latitude = lat;
    // ################################################################################################################
    // 3. Change the url
    window.location.hash = `latitude=${lat}&longitude=${lon}${API_CONFIG}&lol&${sTerm}`;
    return search;
  } catch (err) {
    throw err;
  }
};
