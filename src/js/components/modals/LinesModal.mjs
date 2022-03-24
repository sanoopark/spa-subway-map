import Component from "js/core/Component.mjs";
import Modal from "js/components/Modal.mjs";
import { colorOptions } from "js/utils/mock.js";

export default class LinesModal extends Component {
  render() {
    const { modalVisible, stationList, selectedLineInfo, isEditing } =
      this.state;

    const { lineName, upStation, downStation, distance, arrival } =
      selectedLineInfo;

    const content = `
      <form name="add-line">
        <div class="input-control">
          <label for="subway-line-name" class="input-label" hidden>
            노선 이름
          </label>
          <input
            type="text"
            id="subway-line-name"
            name="subway-line-name"
            class="input-field"
            value="${isEditing ? lineName : ""}"
            placeholder="노선 이름"
            required
          />
        </div>
        <div class="d-flex items-center input-control">
          <label for="up-station" class="input-label" hidden>
            상행역
          </label>
          <select id="up-station" class="mr-2">
            ${
              isEditing
                ? `<option value="" selected hidden>${upStation}</option>`
                : `<option value="" selected disabled hidden>상행역</option>`
            }
            ${stationList.map((station) => `<option>${station}</option>`)}
          </select>
          <label for="down-station" class="input-label" hidden>
            하행역
          </label>
          <select id="down-station">
            ${
              isEditing
                ? `<option value="" selected hidden>${downStation}</option>`
                : `<option value="" selected disabled hidden>하행역</option>`
            }
            ${stationList.map((station) => `<option>${station}</option>`)}
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
            value="${isEditing ? distance : ""}"
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
            value="${isEditing ? arrival : ""}"
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
        <div class="subway-line-color-selector px-2">
          ${this.getSubwayLineColorSelector()}
        </div>
        <div class="d-flex justify-end mt-3">
          <button type="submit" name="submit" class="input-submit bg-cyan-300">
            확인
          </button>
        </div>
      </form>
    `;

    new Modal(this.target, { content, modalVisible });
  }

  getSubwayLineColorSelector() {
    const subwayLineColorOptionTemplate = (color, index) => {
      const hasNewLine = (index + 1) % 7 === 0;
      return `<button type="button" class="color-option bg-${color}" name="bg-${color}"></button> ${
        hasNewLine ? "<br/>" : ""
      }`;
    };

    return colorOptions.map(subwayLineColorOptionTemplate).join("");
  }

  setEvent() {
    const { handleModalSubmit, handleColorSelect } = this.state;

    this.addEvent({
      eventType: "click",
      selector: ".subway-line-color-selector",
      callback: handleColorSelect,
    });

    this.addEvent({
      eventType: "submit",
      selector: "form[name=add-line]",
      callback: handleModalSubmit,
    });
  }

  updated() {
    const { color } = this.state.selectedLineInfo;
    color && this.setInitialColor(color);
  }

  setInitialColor(color) {
    const buttonWithColor = this.target.querySelector(`button[name=${color}]`);
    if (!buttonWithColor) return;

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    buttonWithColor.dispatchEvent(clickEvent);
  }
}
