import View from "../View";
class searchWeatherView extends View {
  _addHandlerSearchWeather(event) {
    const searchField = document.querySelector(`.search`);
    searchField.addEventListener(`submit`, event);
  }
  _addSearchAnimation() {
    document.querySelectorAll(`.card`).forEach((card) => card.classList.add(`animate-load`));
  }
  _getSearchTerm() {
    return document.querySelector(`.city-search`).value;
  }
  _clearText() {
    document.querySelector(`.city-search`).value = ``;
  }
}

export default new searchWeatherView();
