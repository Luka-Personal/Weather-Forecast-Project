import View from "../View";
import { months } from "../../helpers";

class GeoViewPrec extends View {
  _parentElement = document.querySelector(`.weather-precipitation__card`);
  _generateMarkup() {
    const dailyPrec = this._data;
    const firstPrecWeekday = new Date(dailyPrec.firstPrecDate).getDate();
    const firstPrecMonth = new Date(dailyPrec.firstPrecDate).getMonth();
    const markup = `
      <h3 class="tertiary-heading">${dailyPrec.precSumDaily[0]} mm</h3>
      <p class="main-paragraph bolder">For rest of the day</p>
      <p class="main-paragraph">${dailyPrec.isExpectedRain ? (dailyPrec.precSumDaily[0] > 0 ? `It's raining now` : `Next expected is ${dailyPrec.firstPrec}mm rain on ${firstPrecWeekday} ${months[firstPrecMonth]}`) : `No rain expected`}</p>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}

export default new GeoViewPrec();
