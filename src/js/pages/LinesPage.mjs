import "css/pages/lines.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { colorOptions } from "js/utils/mock.js";

export default class LinesPage extends Component {
  mounted() {
    const isLoggedIn = localStorage.get("isLoggedIn");
    new Header(this.target, { isLoggedIn });

    this.getSubwayLineColorSelector();
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

    const template = document.createElement("template");

    template.innerHTML = `
      <div class="modal">
        <div class="modal-inner p-8">
          <button class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <header>
            <h2 class="text-center">🛤️ 노선 추가</h2>
          </header>
          <form>
            <div class="input-control">
              <label for="subway-line-name" class="input-label" hidden>
                노선 이름
              </label>
              <input
                type="text"
                id="subway-line-name"
                name="subway-line-name"
                class="input-field"
                placeholder="노선 이름"
                required
              />
            </div>
            <div class="d-flex items-center input-control">
              <label for="up-station" class="input-label" hidden>
                상행역
              </label>
              <select id="up-station" class="mr-2">
                <option value="" selected disabled hidden>
                  상행역
                </option>
                <option>사당</option>
                <option>방배</option>
                <option>서초</option>
              </select>
              <label for="down-station" class="input-label" hidden>
                하행역
              </label>
              <select id="down-station">
                <option value="" selected disabled hidden>
                  하행역
                </option>
                <option>사당</option>
                <option>방배</option>
                <option>서초</option>
              </select>
            </div>
            <div class="input-control">
              <label for="distance" class="input-label" hidden>
                상행 하행역 거리
              </label>
              <input
                type="number"
                id="distance"
                name="distance"
                class="input-field mr-2"
                placeholder="상행 하행역 거리"
                required
              />
              <label for="duration" class="input-label" hidden>
                상행 하행역 시간
              </label>
              <input
                type="number"
                id="duration"
                name="arrival"
                class="input-field"
                placeholder="상행 하행역 시간"
                required
              />
            </div>
            <div class="input-control">
              <div>
                <label for="subway-line-color" class="input-label" hidden>
                  색상
                </label>
                <input
                  type="text"
                  id="subway-line-color"
                  name="subway-line-color"
                  class="input-field"
                  placeholder="색상을 아래에서 선택해주세요."
                  disabled
                  required
                />
              </div>
            </div>
            <div class="subway-line-color-selector px-2"></div>
            <div class="d-flex justify-end mt-3">
              <button type="submit" name="submit" class="input-submit bg-cyan-300">
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const modalElement = template.content.firstElementChild;
    const rootElement = document.body.firstElementChild;

    rootElement.insertAdjacentElement("beforeend", modalElement);
  }

  getSubwayLineColorSelector() {
    const subwayLineColorOptionTemplate = (color, index) => {
      const hasNewLine = (index + 1) % 7 === 0;
      return `<button type="button" class="color-option bg-${color}"></button> ${
        hasNewLine ? "<br/>" : ""
      }`;
    };

    const $subwayLineColorSelector = this.target.querySelector(
      ".subway-line-color-selector"
    );

    $subwayLineColorSelector.innerHTML = colorOptions
      .map(subwayLineColorOptionTemplate)
      .join("");
  }
}
