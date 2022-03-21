import Component from "js/core/Component.mjs";
import Modal from "js/components/Modal.mjs";

export default class SectionsModal extends Component {
  render() {
    const { modalVisible, stationName, stationIndex } = this.state;

    const content = `
      <form data-index="${stationIndex}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
        <div class="input-control">
          <label for="subway-line-name" class="input-label" hidden>노선 이름</label>
          <input
            type="text"
            id="station-name"
            name="station-name"
            class="input-field"
            value="${stationName}"
            required
          />
        </div>
        <button type="submit" name="submit" class="input-submit bg-cyan-300">확인</button>
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
