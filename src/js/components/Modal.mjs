import Component from "js/core/Component.mjs";

export default class Modal extends Component {
  render() {
    const { content, modalVisible } = this.state;

    this.target.innerHTML = `
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        ${content}
      </div>
    `;

    if (modalVisible) {
      this.target.classList.add("open");
    } else {
      this.target.classList.remove("open");
    }
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: ".modal-close",
      callback: this.handleModalClose,
    });
  }

  handleModalClose() {
    this.setState({ modalVisible: false });
  }
}
