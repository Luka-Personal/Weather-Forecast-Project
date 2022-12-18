import View from "../View";

class GeoViewHourly extends View {
  _parentElement = document.querySelector(`.weather-hourly__cards`);
  _weatherTitleElement = this._parentElement.previousElementSibling;
  _generateTitleMarkup() {
    this._weatherTitleElement.textContent = `${this._data.title[0]} condtitions will continue for the rest of the day. ${this._data.windSpeed > 2 ? `Wind speed is up to ${this._mathCeil(this._data.windSpeed)} km/h.` : ``}`;
  }
  _generateMarkup() {
    const localeConfig = { minimumIntegerDigits: 2, useGrouping: false };
    const hourlyWeather = this._data;

    const markup = `
      ${hourlyWeather.time
        .map((_, i) => {
          const ceiledTemp = this._mathCeil(hourlyWeather.tempCurr[i]);
          const dataHour = hourlyWeather.time[i].length > 3 ? new Date(hourlyWeather.time[i]).getHours().toLocaleString(`en-US`, localeConfig) : hourlyWeather.time[i];
          return `
          <div class="weather-card__hourly">
           <p class="main-paragraph">${dataHour}</p>
           <ion-icon class="weather-hourly__icons" name="${hourlyWeather.weather[i][1]}"></ion-icon>
           <p class="main-paragraph bolder ${this._getTempColor(ceiledTemp)}">${ceiledTemp}&deg</p>
          </div>
              `;
        })
        .join(``)}
      `;
    this._clear(this._weatherTitleElement);
    this._generateTitleMarkup();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}

export default new GeoViewHourly();
