import "css/pages/sections.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import SectionsModal from "../components/modals/SectionsModal.mjs";
import StationsModal from "../components/modals/StationsModal.mjs";
import { localStorage } from "js/storage.mjs";

export default class SectionsPage extends Component {
  setup() {
    this.state = {
      lineList: localStorage.get("lineList") || [],
      stationList: localStorage.get("stationList") || [],
      selectColor: "",
      selectedIndex: 0,
    };
  }

  mounted() {
    const rootElement = this.target;
    const modalElement = document.querySelector(".modal");

    this.header = new Header(rootElement);
    this.sectionsModal = new SectionsModal(modalElement, {
      modalVisible: false,
      stationList: this.state.stationList,
      lineList: this.state.lineList,
      handleModalSubmit: this.handleSectionsModalSubmit.bind(this),
    });
  }

  render() {
    const mainElement = this.target.querySelector("main");
    const { lineList, selectColor } = this.state;
    const initialSelectColor = lineList.length > 0 && lineList[0].color;

    mainElement.innerHTML = `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          <button
            type="button"
            class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
            name="add-section"
          >
            구간 추가
          </button>
        </div>
        <form class="d-flex items-center pl-1">
          <label for="subway-line" class="input-label" hidden>노선</label>
          <select id="subway-line" class="${selectColor || initialSelectColor}">
            ${this.renderOptions()}
          </select>
        </form>
        <ul class="mt-3 pl-0">
          ${this.renderStationList()}
        </ul>
      </div>
    `;
  }

  renderOptions() {
    const { lineList, selectedIndex } = this.state;

    return lineList
      .map(
        ({ id: lineId, lineName, color }) => `
          <option data-color="${color}" 
            ${this.setOptionSelected(
              lineId,
              selectedIndex
            )}>${lineName}</option>
        `
      )
      .join("");
  }

  setOptionSelected(lineId, selectedIndex) {
    if (lineId === selectedIndex + 1) return "selected";
    else return "";
  }

  renderStationList() {
    const { lineList, selectedIndex } = this.state;

    return (
      lineList
        .filter(({ id }) => id === selectedIndex + 1)
        .pop()
        ?.stations?.map(
          (stationName, stationIndex) => `
            <li class="d-flex items-center py-2 relative" data-id="${stationIndex}" data-name="${stationName}">
              <span class="w-100 pl-6">${stationName}</span>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1"
                name="edit"
              >수정</button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm"
                name="delete"
              >삭제</button>
            </li>
            <hr class="my-0" />
          `
        )
        .join("") || ""
    );
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: "button[name=add-section]",
      callback: this.handleAddButton,
    });

    this.addEvent({
      eventType: "click",
      selector: "ul",
      callback: this.handleDeleteButton,
    });

    this.addEvent({
      eventType: "click",
      selector: "ul",
      callback: this.handleEditButton,
    });

    this.addEvent({
      eventType: "change",
      selector: "select#subway-line",
      callback: this.handleSelectChange,
    });
  }

  handleAddButton() {
    this.#toggleSectionsModal(true);
  }

  #toggleSectionsModal(isVisible) {
    this.sectionsModal.setState({
      modalVisible: isVisible,
    });
  }

  handleDeleteButton({ target }) {
    if (!target.closest("button[name=delete]")) return;
    const stationIndex = Number(target.closest("li").dataset.id);
    const newLineList = this.#deleteStationFromList(stationIndex);
    this.setState({ lineList: newLineList });
    localStorage.set("lineList", newLineList);
  }

  #deleteStationFromList(stationIndex) {
    const { lineList, selectedIndex } = this.state;
    const makeNewLineList = (lineInfo) => {
      const { id: lineId, stations = [] } = lineInfo;
      const isNotSelectedLine = lineId !== selectedIndex + 1;
      if (isNotSelectedLine) return lineInfo;
      const newStations = this.#spliceStations(stations, stationIndex);
      return { ...lineInfo, stations: newStations };
    };
    return lineList.map(makeNewLineList);
  }

  #spliceStations(stations, stationIndex) {
    const newStations = [...stations];
    newStations.splice(stationIndex, 1);
    return newStations;
  }

  handleEditButton({ target }) {
    if (!target.closest("button[name=edit]")) return;
    const modalElement = document.querySelector(".modal");
    const { id: stationIndex, name: stationName } =
      target.closest("li").dataset;

    this.stationsModal = new StationsModal(modalElement, {
      modalVisible: true,
      stationIndex,
      stationName,
      handleModalSubmit: this.handleStationModalSubmit.bind(this),
    });
  }

  handleStationModalSubmit(e) {
    e.preventDefault();
    const formElement = e.target;
    const stationIndex = Number(formElement.dataset.index);
    const stationInputValue = formElement.querySelector("input").value;
    const { lineList, selectedIndex } = this.state;

    const newLineList = lineList.map((lineInfo) => {
      const { id: lineId, stations = [] } = lineInfo;
      const isNotSelectedLine = lineId !== selectedIndex + 1;
      if (isNotSelectedLine) return lineInfo;
      const newStations = this.#editStations(
        stations,
        stationIndex,
        stationInputValue
      );
      return { ...lineInfo, stations: newStations };
    });

    this.stationsModal.setState({ modalVisible: false });
    this.setState({ lineList: newLineList });
    localStorage.set("lineList", newLineList);
  }

  #editStations(stations, stationIndex, stationInputValue) {
    const newStations = [...stations];
    newStations[stationIndex] = stationInputValue;
    return newStations;
  }

  handleSelectChange({ target }) {
    const { selectedIndex } = target;
    const { color: selectColor } = this.#getSelectedOption(target).dataset;

    this.setState({
      selectColor,
      selectedIndex,
    });
  }

  #getSelectedOption(selectElement) {
    return selectElement.options[selectElement.selectedIndex];
  }

  handleSectionsModalSubmit(e) {
    e.preventDefault();
    const formElement = e.target;

    const [selectedLineName, selectedStationName] =
      this.#getModalSelectValues(formElement);

    const newLineList = this.#addNewStationToList(
      this.state.lineList,
      selectedLineName,
      selectedStationName
    );

    const lineId =
      newLineList.map(({ lineName }) => lineName).indexOf(selectedLineName) + 1;

    this.#setNewLineList(newLineList, lineId);
    this.#setNewLineColorToSelect();
    this.#toggleSectionsModal(false);
  }

  #getModalSelectValues(formElement) {
    const modalSelectElements = formElement.querySelectorAll("select");
    return [...modalSelectElements].map(({ value }) => value);
  }

  #addNewStationToList(lineList, selectedLineName, selectedStationName) {
    return lineList.map((lineInfo) => {
      const { lineName, stations = [] } = lineInfo;
      if (lineName !== selectedLineName) return lineInfo;
      return { ...lineInfo, stations: [...stations, selectedStationName] };
    });
  }

  #setNewLineList(newLineList, lineId) {
    this.setState({ lineList: newLineList, selectedIndex: lineId - 1 });
    localStorage.set("lineList", newLineList);
  }

  #setNewLineColorToSelect() {
    const lineSelectElement = this.target.querySelector("select#subway-line");
    const { color } = this.#getSelectedOption(lineSelectElement).dataset;
    this.setState({ selectColor: color });
  }
}
