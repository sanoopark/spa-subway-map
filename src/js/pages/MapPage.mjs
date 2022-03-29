import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { localStorage } from "js/storage.mjs";

export default class MapPage extends Component {
  setup() {
    this.state.lineList = localStorage.get("lineList") || [];
  }

  mounted() {
    const rootElement = this.target;
    this.header = new Header(rootElement);
  }

  render() {
    const mainElement = this.target.querySelector("main");
    const { lineList } = this.state;

    mainElement.innerHTML = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
          <h2>🗺️ 전체 보기</h2>
        </div>
        ${
          lineList.length > 0
            ? this.renderLines(this.state.lineList)
            : "<span>등록된 노선이 없습니다.</span>"
        }
      <div>
    `;
  }

  renderLines(lineList) {
    return lineList
      .map(({ color, lineName, stations = [] }) => {
        const stationLength = stations.length;
        if (!stationLength) return "";

        return `
          <ul class="mt-3 pl-0 m-20 mb-10">
            <span class="w-100 pl-6 subway-line-list-item-name map-line-name">🔎 ${lineName}</span>
            ${this.renderStations(stations, color, stationLength)}
          </ul>
        `;
      })
      .join("");
  }

  renderStations(stations, color, stationLength) {
    return stations
      .map((station, index) => {
        const isLastStation = index === stationLength - 1;

        return `
          <li class="d-flex items-center py-2 relative">
            <span class="subway-line-color-dot ${color}">
              ${
                isLastStation
                  ? ``
                  : `<span class="subway-line-color-stick ${color}"></span>`
              }
            </span>
            <span class="w-100 pl-6 subway-line-list-item-name">${station}</span>
          </li>
        `;
      })
      .join("");
  }
}
