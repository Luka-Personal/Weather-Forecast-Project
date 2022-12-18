import View from "../View";

class geoWeatherWindDirec extends View {
  _parentElement = document.querySelector(`.weather-wind__compass`);

  _generateMarkup() {
    const wind = this._data;
    const markup = `
          <div class="wind-direction__indicator"></div>
          <ion-icon name="caret-up-outline"></ion-icon>
          <ion-icon name="caret-down-outline"></ion-icon>
          <ion-icon name="caret-back-outline"></ion-icon>
          <ion-icon name="caret-forward-outline"></ion-icon>
          <p class="wind-direction north">n</p>
          <p class="wind-direction east">e</p>
          <p class="wind-direction south">s</p>
          <p class="wind-direction west">w</p>
          <span class="wind-current_speed">${this._mathCeil(wind.windSpeed)} <span class="wind-kmh">km/h</span></span>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
    this._parentElement.firstElementChild.style.transform = `translateY(-50%) rotate(${-this._data.windDirectDeg}deg)`;
  }
}

export default new geoWeatherWindDirec();
