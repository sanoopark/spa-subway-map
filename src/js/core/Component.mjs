import { observe } from "./observer.js";

export default class Component {
  constructor(target, props) {
    this.target = target;
    this.state = props;
    this.render();
    this.setEvent();
    this.mounted();

    observe(() => {
      this.rerender();
    });
  }

  render() {}

  setEvent() {}

  mounted() {}

  addEvent({ eventType, selector, callback }) {
    const element = this.target.querySelector(selector);
    const isTarget = (target) => target.closest(selector);

    element.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return;
      callback?.bind(this)(event);
    });
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.rerender();
    this.updated();
  }

  rerender() {
    this.render();
    this.setEvent();
  }

  updated() {}
}
