import View from "../View";

class geoWeatherPressure extends View {
  _parentElement = document.querySelector(`.weather-pressure__card`);

  _generateMarkup() {
    const pressure = this._data;
    const pressureStr = String(this._mathFloor(pressure.mslPressure));
    const markup = `
      <h3 class="tertiary-heading"><span>${pressureStr} </span> hPa</h3>
      <p class="main-paragraph">Right now air pressure is ${this._getPressureLevel(this._mathFloor(pressure.mslPressure))}</p>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
    this._parentElement.querySelector(`.tertiary-heading span`).innerHTML = pressureStr.replace(pressureStr[pressureStr.length - 1], `<span style="font-size: 2.5rem;">${pressureStr.length - 1}</span`);
  }
}
export default new geoWeatherPressure();
