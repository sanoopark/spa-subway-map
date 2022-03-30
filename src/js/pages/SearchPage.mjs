import "css/pages/search.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { api } from "js/fetch.mjs";
import { MESSAGE } from "js/constants.mjs";

const START_STATION = "start-station";
const END_STATION = "end-station";

export default class SearchPage extends Component {
  setup() {
    this.state.startStation = "";
    this.state.endStation = "";
    this.state.startSearchResult = [];
    this.state.endSearchResult = [];
  }

  mounted() {
    this.header = new Header(this.target);
  }

  render() {
    const mainElement = this.target.querySelector("main");
    const { startStation, endStation, startSearchResult, endSearchResult } =
      this.state;

    mainElement.innerHTML = `
      <div class="search-wrapper p-10 bg-white">
        <div class="heading">
          <h2>🔎 길 찾기</h2>
        </div>
        <form class="d-flex items-center justify-around">
            <label for="station-name" class="input-label" hidden>출발역</label>
            <div class="relative d-flex items-center">
              <input
                type="text"
                id="station-name"
                name="${START_STATION}"
                class="input-field search-input-field"
                placeholder="출발역"
                value="${startStation}"
              />
              <ul class="station-search-list">
                ${startSearchResult
                  .map(
                    ({ stationID, stationName }) => `
                      <li class="station-search-item" data-id="${stationID}" data-type="${START_STATION}">
                        ${stationName}
                      <li>
                    `
                  )
                  .join("")}
              </ul>
            </div>
            <label for="station-name" class="input-label" hidden>도착역</label>
            <div class="relative d-flex items-center">
              <input
                type="text"
                id="station-name"
                name="${END_STATION}"
                class="input-field search-input-field"
                placeholder="도착역"
                value="${endStation}"
              />
              <ul class="station-search-list">
                ${endSearchResult
                  .map(
                    ({ stationID, stationName }) => `
                      <li class="station-search-item" data-id="${stationID}" data-type="end-station">${stationName}<li>
                    `
                  )
                  .join("")}
              </ul>
            </div>
            <button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300 search-button"
            >
            검색
            </button>
        </form>
        <div class="ml-2 mt-12"></div>
      <div>
    `;
  }

  setEvent() {
    function debounce(func, timeout = 500) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func(...args);
        }, timeout);
      };
    }

    this.addEvent({
      eventType: "input",
      selector: `input[name=${START_STATION}]`,
      callback: debounce(this.handleInputChange.bind(this)),
    });

    this.addEvent({
      eventType: "input",
      selector: `input[name=${END_STATION}]`,
      callback: debounce(this.handleInputChange.bind(this)),
    });

    this.addEvent({
      eventType: "click",
      selector: "form",
      callback: this.handleSearchResultClick.bind(this),
    });
  }

  async handleInputChange({ target }) {
    const inputValue = target.value.trim();
    if (!inputValue) return;

    const response = await api.fetchStationDetails(inputValue);

    if (response.isError) {
      alert(MESSAGE.SERVER_ERROR);
      return;
    }

    const searchResult = response.data.result.station.map(
      ({ stationID, stationName }) => {
        return { stationID, stationName };
      }
    );
    if (target.name === START_STATION) {
      this.setState({
        startSearchResult: searchResult,
        startStation: inputValue,
      });
    } else {
      this.setState({ endSearchResult: searchResult, endStation: inputValue });
    }
  }

  handleSearchResultClick({ target }) {
    if (!target.closest("li")) return;
    const inputType = target.dataset.type;
    const stationName = target.textContent.trim();

    switch (inputType) {
      case START_STATION:
        this.setState({ startStation: stationName, startSearchResult: [] });
        break;
      case END_STATION:
        this.setState({ endStation: stationName, endSearchResult: [] });
        break;
    }
  }
}
