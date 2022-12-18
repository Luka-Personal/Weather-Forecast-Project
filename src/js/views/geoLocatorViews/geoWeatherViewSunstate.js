import View from "../View";

class geoWeatherSunstate extends View {
  _parentElement = document.querySelector(`.weather-sunstate__card`);

  _generateMarkup() {
    const sunstate = this._data;
    const titleMarkup = `${this._getHours(sunstate.sunRise[0]) < new Date().getHours() ? `<ion-icon name="arrow-down-circle"></ion-icon> SUNSET` : `<ion-icon name="arrow-up-circle"></ion-icon> SUNRISE`}`;
    const markup = `
      <h3 class="tertiary-heading">${this._getHours(sunstate.sunRise[0]) < new Date().getHours() ? sunstate.formattedSunset : sunstate.formattedSunrise}</h3>
      <p class="secondary-paragraph">Sunset: ${this._getHours(sunstate.sunRise[0]) > new Date().getHours() ? sunstate.formattedSunset : sunstate.formattedSunrise}</p>
    `;
    this._clear(this._parentElement.parentElement.querySelector(`p`));
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
    this._parentElement.parentElement.querySelector(`p`).insertAdjacentHTML(`afterbegin`, titleMarkup);
  }
}

export default new geoWeatherSunstate();
