import "css/pages/lines.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import LinesModal from "js/components/modals/LinesModal.mjs";
import { localStorage } from "js/storage.mjs";
import { isDuplication, isValidLength } from "js/utils/helpers.mjs";
import { MESSAGE } from "js/constants.mjs";

export default class LinesPage extends Component {
  mounted() {
    const rootElement = this.target;
    const modalElement = document.querySelector(".modal");
    const stationList = localStorage.get("stationList") || [];

    this.header = new Header(rootElement);
    this.linesModal = new LinesModal(modalElement, {
      stationList,
      modalVisible: false,
      handleModalSubmit: this.handleModalSubmit.bind(this),
      selectedLineInfo: {},
      isEditing: false,
    });
  }

  render() {
    const mainElement = this.target.querySelector("main");
    const { lineList } = this.state;

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
        ${lineList
          .map(
            ({ id, lineName, color }) => `
              <li class="d-flex items-center py-2 relative" data-id=${id}>
                <span class="subway-line-color-dot ${color}"></span>
                <span class="w-100 pl-6 subway-line-list-item-name">${lineName}</span>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1" name="edit">수정</button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm" name="delete">삭제</button>
              </li>
              <hr class="my-0" />
            `
          )
          .join("")}
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

    this.addEvent({
      eventType: "click",
      selector: "ul",
      callback: this.handleEditButton,
    });

    this.addEvent({
      eventType: "click",
      selector: "ul",
      callback: this.handleDeleteButton,
    });
  }

  handleAddButton() {
    this.linesModal.setState({
      modalVisible: true,
    });
  }

  handleEditButton({ target }) {
    if (!target.closest("button[name=edit]")) return;
    const selectedLineId = Number(target.closest("li").dataset.id);
    const selectedLineInfo = this.#getSelectedLineInfo(selectedLineId);

    this.linesModal.setState({
      modalVisible: true,
      selectedLineInfo,
      isEditing: true,
    });
  }

  #getSelectedLineInfo(selectedLineId) {
    const { lineList } = this.state;
    return lineList.filter(({ id }) => id === selectedLineId).pop();
  }

  handleDeleteButton({ target }) {
    if (!target.closest("button[name=delete]")) return;
    if (!confirm(MESSAGE.CONFIRM_DELETE)) return;

    const selectedId = Number(target.closest("li").dataset.id);
    const { lineList } = this.state;
    const newStationList = lineList.filter(({ id }) => id !== selectedId);

    this.setState({ lineList: newStationList });
    localStorage.set("lineList", this.state.lineList);
  }

  handleModalSubmit(e) {
    e.preventDefault();
    const { lineList: prevList } = this.state;
    const { isEditing, selectedLineInfo } = this.linesModal.state;
    const formElement = e.target;
    const formValues = this.#getFormValues(formElement);
    const { lineName } = formValues;

    if (isEditing) {
      this.#editSelectedLine(selectedLineInfo, formValues);
    } else {
      const lineNames = prevList.map(({ lineName }) => lineName);
      if (isValidLength({ userInput: lineName, min: 2, max: 10 })) return;
      if (isDuplication({ element: lineName, array: lineNames })) return;
      this.#addNewLine(prevList, formValues);
    }

    this.linesModal.setState({ modalVisible: false });
    localStorage.set("lineList", this.state.lineList);
  }

  #getFormValues(formElement) {
    return {
      lineName: this.#getInputValue(formElement, "subway-line-name"),
      upStation: this.#getOptionValue(formElement, "#up-station"),
      downStation: this.#getOptionValue(formElement, "#down-station"),
      distance: this.#getInputValue(formElement, "distance"),
      arrival: this.#getInputValue(formElement, "arrival"),
      color: this.#getColorClassName(formElement, "subway-line-color"),
    };
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

  #editSelectedLine(selectedLineInfo, formValues) {
    const editingLineId = selectedLineInfo.id;
    const editedLineList = this.state.lineList.map((line) => {
      const currentLineId = line.id;
      if (currentLineId === editingLineId) {
        return {
          id: currentLineId,
          ...formValues,
        };
      }
      return line;
    });

    this.setState({
      lineList: editedLineList,
    });
  }

  #addNewLine(prevList, formValues) {
    const id = prevList.length + 1;
    const lineInfo = {
      id,
      ...formValues,
    };

    this.setState({
      lineList: [...prevList, lineInfo],
    });
  }
}
