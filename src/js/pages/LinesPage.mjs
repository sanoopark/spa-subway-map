import "css/pages/lines.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import LinesModal from "js/components/modals/LinesModal.mjs";
import { localStorage } from "js/storage.mjs";
import { isDuplication, isValidLength } from "js/utils/helpers.mjs";

export default class LinesPage extends Component {
  mounted() {
    const rootElement = this.target;
    const modalElement = document.querySelector(".modal");
    const stationList = localStorage.get("stationList");

    this.header = new Header(rootElement);
    this.linesModal = new LinesModal(modalElement, {
      stationList,
      modalVisible: false,
      handleColorSelect: this.handleColorSelect.bind(this),
      handleModalSubmit: this.handleModalSubmit.bind(this),
    });
  }

  render() {
    const mainElement = this.target.querySelector("main");

    mainElement.innerHTML = `
      <div class="wrapper bg-white p-10">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
        <button
          type="button"
          class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
          name="add-lines"
        >
          노선 추가
        </button>
      </div>
      <ul class="mt-3 pl-0">
        <li class="d-flex items-center py-2 relative">
          <span class="subway-line-color-dot bg-blue-400"></span>
          <span class="w-100 pl-6 subway-line-list-item-name"
            >1호선</span
          >
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm"
          >
            삭제
          </button>
        </li>
        <hr class="my-0" />
      </ul>
      </div>
    `;
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: "button[name=add-lines]",
      callback: this.handleAddButton,
    });
  }

  handleAddButton() {
    this.linesModal.setState({
      modalVisible: true,
    });
  }

  handleColorSelect({ target }) {
    if (!target.closest("button")) return;

    const colorClassName = target.name;
    const inputElement = document.querySelector(
      "input[name=subway-line-color]"
    );
    const colorRGB = window
      .getComputedStyle(inputElement)
      .getPropertyValue("background-color");

    inputElement.placeholder = "노선의 색상이 선택되었습니다.";
    inputElement.className = `input-color-selected ${colorClassName}`;
    inputElement.dataset.color = colorClassName;
    inputElement.value = colorRGB.toUpperCase();
  }

  handleModalSubmit(e) {
    e.preventDefault();
    const formElement = e.target;
    const lineName = this.#getInputValue(formElement, "subway-line-name");
    const upStation = this.#getOptionValue(formElement, "#up-station");
    const downStation = this.#getOptionValue(formElement, "#down-station");
    const distance = this.#getInputValue(formElement, "distance");
    const arrival = this.#getInputValue(formElement, "arrival");
    const color = this.#getColorClassName(formElement, "subway-line-color");
    const lineInfo = {
      lineName,
      upStation,
      downStation,
      distance,
      arrival,
      color,
    };

    const { lineList: prevList } = this.state;
    const lineNames = prevList.map(({ lineName }) => lineName);

    if (isValidLength({ userInput: lineName, min: 2, max: 10 })) return;
    if (isDuplication({ element: lineName, array: lineNames })) return;

    this.setState({
      lineList: [...prevList, lineInfo],
    });
    this.linesModal.setState({ modalVisible: false });
    localStorage.set("lineList", this.state.lineList);
  }

  #getInputValue(formElement, inputName) {
    return formElement.querySelector(`input[name=${inputName}]`).value;
  }

  #getOptionValue(formElement, selector) {
    const selectElement = formElement.querySelector(selector);
    return selectElement.options[selectElement.selectedIndex].value;
  }

  #getColorClassName(formElement, inputName) {
    return formElement.querySelector(`input[name=${inputName}]`).dataset.color;
  }
}
