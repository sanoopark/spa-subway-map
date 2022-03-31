import { observe } from "./observer.js";
import { store } from "../core/store.js";
import { redirect } from "simple-vanilla-router";
import { MESSAGE } from "../constants.mjs";

export default class Component {
  constructor(target, props) {
    this.target = target;
    this.state = props;
    this.setup();
    this.render();
    this.setEvent();
    this.mounted();

    observe(() => {
      this.rerender();
    });
  }

  setup() {}

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
    if (!store.state.isLoggedIn) {
      alert(MESSAGE.LOGIN_REQUIRED);
      redirect("/login");
      return;
    }

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
