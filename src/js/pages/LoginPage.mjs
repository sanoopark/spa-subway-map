import "css/pages/auth.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { MESSAGE } from "js/constants.mjs";
import { localStorage } from "js/storage.mjs";
import { redirect } from "simple-vanilla-router";
import { store } from "../core/store.js";

export default class LoginPage extends Component {
  mounted() {
    const rootElement = this.target;
    this.header = new Header(rootElement);
  }

  render() {
    const mainElement = this.target.querySelector("main");

    mainElement.innerHTML = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
        <h2>π λ‘κ·ΈμΈ</h2>
      </div>
      <form name="login" class="form">
        <div class="input-control">
          <label for="email" class="input-label" hidden>μ΄λ©μΌ</label>
          <input
            type="email"
            id="email"
            name="email"
            class="input-field"
            placeholder="μ΄λ©μΌ"
            required
          />
        </div>
        <div class="input-control">
          <label for="password" class="input-label" hidden>λΉλ°λ²νΈ</label>
          <input
            type="password"
            id="password"
            name="password"
            class="input-field"
            placeholder="λΉλ°λ²νΈ"
          />
        </div>
        <div class="input-control w-100">
          <button
            type="button"
            name="submit"
            class="input-submit w-100 bg-cyan-300"
          >
          νμΈ
          </button>
        </div>
        <p class="text-gray-700 pl-2">
          μμ§ νμμ΄ μλμ κ°μ?
          <a href="/signup" class="link-signup">νμκ°μ</a>
        </p>
      </form>
    `;
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: ".input-submit",
      callback: this.handleLoginButton,
    });

    this.addEvent({
      eventType: "click",
      selector: ".link-signup",
      callback: this.onClickRedirect,
    });
  }

  handleLoginButton() {
    const inputValues = this.#processUserInputValues();
    const userAuthInfo = localStorage.get("userAuthInfo") || {};
    const isLoginSuccess = Object.entries(inputValues).every(
      ([key, value]) => userAuthInfo[key] === value
    );

    if (!isLoginSuccess) {
      alert(MESSAGE.WRONG_INFO);
      return;
    }

    store.setState({ isLoggedIn: true });
    localStorage.set("isLoggedIn", true);
    redirect("/");
  }

  #processUserInputValues() {
    const formElement = this.target.querySelector("form[name=login]");
    const inputNodes = [...formElement.querySelectorAll(".input-field")];
    const inputValues = {};
    inputNodes.forEach((node) => (inputValues[node.id] = node.value));
    return inputValues;
  }

  onClickRedirect(e) {
    e.preventDefault();

    const linkElement = e.target.closest("a");
    if (!linkElement) return;

    const pathname = `/${linkElement.href.split("/")[3]}`;
    redirect(pathname);
  }
}
