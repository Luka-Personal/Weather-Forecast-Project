import View from "../View";

class GeoViewRealFl extends View {
  _parentElement = document.querySelector(`.weather-realfeel__card`);
  _generateMarkup() {
    const realFeel = this._data;
    const markup = `
      <h3 class="tertiary-heading">${this._mathCeil(realFeel.realFeelTemp)}&deg;</h3>
      <p class="main-paragraph">${realFeel.isWindy ? `Wind is making it feel colder.` : `Text WIP`}</p>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}
export default new GeoViewRealFl();
