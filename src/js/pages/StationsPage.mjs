import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { localStorage } from "js/storage.mjs";
import { isDuplication, isValidLength } from "../utils/helpers.mjs";

export default class StationsPage extends Component {
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
              required
            />
            <button
              type="button"
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
              (stationName) => `
                <li class="station-list-item d-flex items-center py-2">
                  <span class="w-100 pl-2">${stationName}</span>
                  <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">
                    수정
                  </button>
                  <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
                </li>
                <hr class="my-0" />
              `
            )
            .join("")}
        </ul>
      </div>
    `;

    new Header(this.target);
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: ".input-submit",
      callback: this.handleButtonSubmit,
    });
  }

  handleButtonSubmit() {
    const userInput = this.target.querySelector(".input-field").value;
    const { stationList: prevList } = this.state;

    if (isValidLength({ userInput, min: 2, max: 20 })) return;
    if (isDuplication({ element: userInput, array: prevList })) return;

    this.setState({ stationList: [...prevList, userInput] });
    localStorage.set("stationList", this.state.stationList);
  }
}
