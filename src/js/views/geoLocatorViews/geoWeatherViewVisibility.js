import View from "../View";

class geoWeatherVisibility extends View {
  _parentElement = document.querySelector(`.weather-visibility__card`);

  _generateMarkup() {
    const visibility = this._data;
    const markup = `
      <h3 class="tertiary-heading">${this._mathCeil(visibility.actualVisibility / 1000)} km</h3>
      <p class="main-paragraph">it's ${this._checkVisibilityLevel(this._mathCeil(visibility.actualVisibility))} right now</p>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}

export default new geoWeatherVisibility();
