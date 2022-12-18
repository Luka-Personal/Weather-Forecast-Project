import View from "../View";
class geoWeatherHumidity extends View {
  _parentElement = document.querySelector(`.weather-humidity__card`);

  _generateMarkup() {
    const humidity = this._data;
    const markup = `
      <h3 class="tertiary-heading">${humidity.relativeHumidity}%</h3>
      <p class="main-paragraph">The dew point is ${this._mathFloor(humidity.dewpoint)}&deg right now.</p>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}

export default new geoWeatherHumidity();
