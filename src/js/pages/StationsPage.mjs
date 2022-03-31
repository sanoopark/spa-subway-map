import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { localStorage } from "js/storage.mjs";
import { isDuplication, isValidLength } from "js/utils/helpers.mjs";
import StationsModal from "js/components/modals/StationsModal.mjs";
import { MESSAGE } from "js/constants.mjs";

export default class StationsPage extends Component {
  setup() {
    this.state = {
      stationList: localStorage.get("stationList") || [],
    };
  }

  mounted() {
    const rootElement = this.target;
    const modalElement = document.querySelector(".modal");

    this.header = new Header(rootElement);
    this.stationsModal = new StationsModal(modalElement, {
      modalVisible: false,
      handleModalSubmit: this.handleModalSubmit.bind(this),
    });
  }

  render() {
    const mainElement = this.target.querySelector("main");
    const { stationList } = this.state;

    mainElement.innerHTML = `
      <div class="wrapper bg-white p-10">
        <div class="heading">
          <h2 class="mt-1">🚉 역 관리</h2>
        </div>
        <form>
          <div class="d-flex w-100">
            <label for="station-name" class="input-label" hidden>
            역 이름
            </label>
            <input
              type="text"
              id="station-name"
              name="stationName"
              class="input-field"
              placeholder="역 이름"
            />
            <button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300 ml-2"
            >
            확인
            </button>
          </div>
        </form>
        <ul class="mt-3 pl-0">
          ${stationList
            .map(
              ({ name: stationName }, index) => `
                <li class="station-list-item d-flex items-center py-2" data-index="${index}" data-name="${stationName}">
                  <span class="w-100 pl-2">${stationName}</span>
                  <button type="button" name="edit" class="bg-gray-50 text-gray-500 text-sm mr-1">
                    수정
                  </button>
                  <button type="button" name="delete" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
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
      eventType: "submit",
      selector: "form",
      callback: this.handleSubmitButton,
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

  handleSubmitButton(e) {
    e.preventDefault();

    const userInput = this.target.querySelector(".input-field").value.trim();
    const { stationList: prevList } = this.state;

    if (isValidLength({ userInput, min: 2, max: 20 })) return;
    if (isDuplication({ element: userInput, array: prevList })) return;

    this.setState({
      stationList: [...prevList, { name: userInput, linked: false }],
    });
    localStorage.set("stationList", this.state.stationList);
  }

  handleEditButton({ target }) {
    if (!target.closest("button[name=edit]")) return;
    const { index: stationIndex, name: stationName } =
      target.closest("li").dataset;

    this.stationsModal.setState({
      modalVisible: true,
      stationIndex,
      stationName,
    });
  }

  handleDeleteButton({ target }) {
    if (!target.closest("button[name=delete]")) return;

    const { index: stationIndex } = target.closest("li").dataset;
    const { stationList } = this.state;

    if (stationList[stationIndex].linked) {
      alert(MESSAGE.CANNOT_DELETE);
      return;
    }

    if (!confirm(MESSAGE.CONFIRM_DELETE)) return;

    const newStationList = [...stationList];
    newStationList.splice(stationIndex, 1);

    this.setState({ stationList: newStationList });
    localStorage.set("stationList", this.state.stationList);
  }

  handleModalSubmit(e) {
    e.preventDefault();
    const formElement = e.target;
    const stationIndex = Number(formElement.dataset.index);
    const stationInputValue = formElement.querySelector("input").value;
    const { stationList } = this.state;
    const newStationList = [...stationList];
    newStationList[stationIndex] = { name: stationInputValue, linked: false };

    this.setState({ stationList: newStationList });
    this.stationsModal.setState({ modalVisible: false });
    localStorage.set("stationList", this.state.stationList);
  }
}
