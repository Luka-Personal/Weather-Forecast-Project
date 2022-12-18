import View from "../View";
import { MAP_DEFAULT_ZOOM_LEVEL } from "../../config";
import { MAP_MAX_ZOOM_LEVEL } from "../../config";
import { LeafletEvent } from "leaflet";

class GeoWeatherMap extends View {
  _parentElement = document.querySelector(`.weather-map__container`);
  _map;
  _marker;
  _generateMarkup() {
    const { latitude, longitude } = this._data;
    if (this._map) {
      this._map.setView([latitude, longitude]);
      this._marker = L.marker([latitude, longitude]).addTo(this._map);
      return;
    }
    this._map = L.map("map").setView([latitude, longitude], MAP_DEFAULT_ZOOM_LEVEL);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: MAP_MAX_ZOOM_LEVEL,
      className: "map-tiles",
    }).addTo(this._map);
    this._marker = L.marker([latitude, longitude], {
      color: `red`,
    }).addTo(this._map);
    this._marker._icon.classList.add("marker-color");
  }
}

export default new GeoWeatherMap();
