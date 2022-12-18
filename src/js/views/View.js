export default class View {
  _render(data) {
    this._data = data;
    this._generateMarkup();
  }
  _mathCeil(data) {
    return Math.ceil(data);
  }
  _mathFloor(data) {
    return Math.floor(data);
  }
  _clear(helperClearer) {
    this._parentElement.innerHTML = ``;
    this._parentElement.classList.remove(`animate-load`);
    if (!helperClearer) return;
    helperClearer.innerHTML = ``;
    helperClearer.classList.remove(`animate-load`);
  }
  _getHours(date) {
    return new Date(date).getHours();
  }
  _getTempColor(temp) {
    if (temp < 5) return `tempsupercold`;
    if (temp >= 5 && temp <= 15) return `tempcold`;
    if (temp > 15 && temp <= 21) return `tempmiddle`;
    if (temp > 21 && temp <= 28) return `temphot`;
    if (temp > 28) return `tempsuperhot`;
  }
  _checkUvLevel(uv) {
    if (uv <= 2) return `Low`;
    if (uv >= 3 && uv <= 5) return `Moderate`;
    if (uv >= 6 && uv <= 7) return `High`;
    if (uv >= 8 && uv <= 10) return `Very High`;
    if (uv >= 11) return `Extreme`;
  }
  _checkVisibilityLevel(meter) {
    if (meter <= 100) return `dense fog`;
    if (meter > 100 && meter <= 200) return `thick fog`;
    if (meter > 200 && meter <= 500) return `moderate fog`;
    if (meter > 500 && meter <= 1000) return `light fog`;
    if (meter > 1000 && meter <= 2000) return `thin fog`;
    if (meter > 2000 && meter <= 4000) return `haze`;
    if (meter > 4000 && meter <= 10000) return `light haze`;
    if (meter > 10000 && meter <= 20000) return `clear`;
    if (meter > 20000 && meter <= 50000) return `very clear`;
    if (meter > 50000) return `perfectly clear`;
  }
  _getPressureLevel(pressure) {
    if (pressure <= 995) return `Very low`;
    if (pressure > 995 && pressure <= 1013) return `Low`;
    if (pressure > 1013 && pressure <= 1030) return `High`;
    if (pressure > 1030) return `Very high`;
  }
}
