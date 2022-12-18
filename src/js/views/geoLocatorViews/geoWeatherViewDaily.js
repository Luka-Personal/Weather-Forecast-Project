import View from "../View";

class GeoViewDaily extends View {
  _parentElement = document.querySelector(`.weather-daily__cards`);
  _checkDate() {
    return new Date().getDay();
  }
  _generateMarkup() {
    this._checkDate();
    const dailyWeather = this._data;
    const markup = `
      ${dailyWeather.time
        .map((el, i) => {
          const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const weekNum = new Date(dailyWeather.time[i]).getDay();
          const ceiledTempMin = this._mathCeil(dailyWeather.tempMin[i]);
          const ceiledTempMax = this._mathCeil(dailyWeather.tempMax[i]);
          // prettier-ignore
          return `
            <div class="weather-card__daily">
                <p class="main-paragraph">
                 <span class="weekday">${this._checkDate() === weekNum ? `Today` : weekDay[weekNum]} </span><ion-icon name="${dailyWeather.weather[i][1]}"></ion-icon> <span class="weekday-temp__min ${this._getTempColor(ceiledTempMin)}">${ceiledTempMin}&deg</span> <span class="weekday-temp__max ${this._getTempColor(ceiledTempMax)}">${ceiledTempMax}&deg</span>
                </p>
            </div>
          `;
        })
        .join(``)}
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}

export default new GeoViewDaily();
