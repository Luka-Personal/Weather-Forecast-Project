import View from "../View";
class GeoViewBrief extends View {
  _data;
  _parentElement = document.querySelector(`.weather-brief__box`);

  _generateMarkup() {
    const briefWeather = this._data;
    const markup = `
        <h2 class="brief-heading">${briefWeather.currentCity}</h2>
        <p class="brief-deg">${this._mathCeil(briefWeather.temperature)}&deg</p>
        <p class="brief-state">${briefWeather.weather[0]}</p>
        <p class="brief__high-low"><span>H:${this._mathCeil(briefWeather.tempMax)}</span> <span>L:${this._mathCeil(briefWeather.tempMin)}</span></p>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}

export default new GeoViewBrief();
