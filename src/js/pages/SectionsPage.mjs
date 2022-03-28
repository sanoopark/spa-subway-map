import "css/pages/sections.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import SectionsModal from "../components/modals/SectionsModal.mjs";
import { localStorage } from "js/storage.mjs";

export default class SectionsPage extends Component {
  mounted() {
    const rootElement = this.target;
    const modalElement = document.querySelector(".modal");

    this.header = new Header(rootElement);
    this.sectionsModal = new SectionsModal(modalElement, {
      modalVisible: false,
      stationList: this.state.stationList,
      handleModalSubmit: this.handleModalSubmit.bind(this),
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

  renderStationList() {
    const { lineList, selectedIndex } = this.state;

    return (
      lineList
        .filter(({ id }) => id === selectedIndex + 1)
        .pop()
        .stations?.map(
          (stationName, stationIndex) => `
            <li class="d-flex items-center py-2 relative" data-id="${stationIndex}">
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
      eventType: "change",
      selector: "select#subway-line",
      callback: this.handleSelectChange,
    });
  }

  handleAddButton() {
    this.sectionsModal.setState({
      modalVisible: true,
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
    return lineList.map((lineInfo) => {
      const { id, stations = [] } = lineInfo;
      if (id === selectedIndex + 1) {
        const newStations = [...stations];
        newStations.splice(stationIndex, 1);
        return { ...lineInfo, stations: newStations };
      }
      return lineInfo;
    });
  }

  handleSelectChange({ target }) {
    const { selectedIndex } = target;
    const selectColor = target.options[target.selectedIndex].dataset.color;

    this.setState({
      selectColor,
      selectedIndex,
    });
  }

  setOptionSelected(lineId, selectedIndex) {
    if (lineId === selectedIndex + 1) {
      return "selected";
    }
    return "";
  }

  handleModalSubmit(e) {
    e.preventDefault();
    const formElement = e.target;
    const values = [...formElement.querySelectorAll("select")].map(
      ({ value }) => value
    );
    const { lineList } = this.state;
    const [selectedLineName, selectedStationName] = values;

    const newLineList = this.#addNewStationToList(
      lineList,
      selectedLineName,
      selectedStationName
    );

    this.setState({ lineList: newLineList });
    localStorage.set("lineList", newLineList);
    this.sectionsModal.setState({
      modalVisible: false,
    });
  }

  #addNewStationToList(lineList, selectedLineName, selectedStationName) {
    return lineList.map((lineInfo) => {
      const { lineName, stations = [] } = lineInfo;
      if (lineName === selectedLineName) {
        return { ...lineInfo, stations: [...stations, selectedStationName] };
      }
      return lineInfo;
    });
  }
}
