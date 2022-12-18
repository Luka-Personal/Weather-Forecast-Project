import View from "../View";

class GeoViewUv extends View {
  _parentElement = document.querySelector(`.weather-uv__card`);
  _calPercentage() {
    return (this._parentElement.querySelector(`div`).querySelector(`p`).style.left = `${this._mathFloor(this._data.uvHourly[0] / 25) * 10}%`);
  }
  _generateMarkup() {
    const hourlyUv = this._data;
    const markup = `
      <h3 class="tertiary-heading">${this._mathFloor(hourlyUv.uvHourly[0] / 25)}</h3>
      <p class="main-paragraph bolder">${this._checkUvLevel(this._mathFloor(hourlyUv.uvHourly[0] / 25))}</p>
      <div><p></p></div>
      <p class="secondary-paragraph">On average ${this._mathFloor(hourlyUv.uvIndexAvg)} for rest of the day</p>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
    this._calPercentage();
  }
}

export default new GeoViewUv();
