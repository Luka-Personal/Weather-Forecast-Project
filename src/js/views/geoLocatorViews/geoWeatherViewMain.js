class geoWeatherMain {
  _addHandlerGeoWeather(event) {
    [`hashchange`, `load`].forEach((ev) => window.addEventListener(ev, event));
  }
  // _addHandlerBgWeather(event) {
  //   [`hashchange`].forEach((ev) => window.addEventListener(ev, event));
  // }
}

export default new geoWeatherMain();
