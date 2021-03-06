import Component from "js/core/Component.mjs";
import Modal from "js/components/Modal.mjs";

export default class SectionsModal extends Component {
  render() {
    const { modalVisible, stationList, lineList } = this.state;

    const content = `
      <form>
        <div class="input-control">
          <label for="subway-line-for-section" class="input-label" hidden>노선</label>
          <select id="subway-line-for-section">
            ${lineList
              .map(
                ({ id, lineName }) => `
                <option data-id="${id}">${lineName}</option>
              `
              )
              .join("")}
          </select>
        </div>
        <div class="d-flex items-center input-control">
          <label for="station-name" class="input-label" hidden>역 이름</label>
          <select id="station-name">
            ${stationList
              .map(
                ({ name }) => `
                <option>${name}</option>
              `
              )
              .join("")}
          </select>
        </div>
        <div class="d-flex justify-end mt-3">
          <button
            type="submit"
            name="submit"
            class="input-submit bg-cyan-300"
          >
            확인
          </button>
        </div>
      </form>
    `;

    new Modal(this.target, { content, modalVisible });
  }

  setEvent() {
    const { handleModalSubmit } = this.state;
    this.addEvent({
      eventType: "submit",
      selector: "form",
      callback: handleModalSubmit,
    });
  }
}
