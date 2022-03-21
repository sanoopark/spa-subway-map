import "css/pages/auth.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { MESSAGE } from "js/constants.mjs";
import { localStorage } from "js/storage.mjs";
import { redirect } from "js/router.mjs";
import { store } from "../core/store.js";

export default class LoginPage extends Component {
  render() {
    const mainElement = this.target.querySelector("main");

    mainElement.innerHTML = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
        <h2>👋 로그인</h2>
      </div>
      <form name="login" class="form">
        <div class="input-control">
          <label for="email" class="input-label" hidden>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            class="input-field"
            placeholder="이메일"
            required
          />
        </div>
        <div class="input-control">
          <label for="password" class="input-label" hidden>비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            class="input-field"
            placeholder="비밀번호"
          />
        </div>
        <div class="input-control w-100">
          <button
            type="button"
            name="submit"
            class="input-submit w-100 bg-cyan-300"
          >
          확인
          </button>
        </div>
        <p class="text-gray-700 pl-2">
          아직 회원이 아니신가요?
          <a href="/signup" class="link-signup">회원가입</a>
        </p>
      </form>
    `;

    new Header(this.target);
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

  /**
   * @todo 유효성 검사 추가
   * @todo 로컬스토리지 -> API
   */
  handleLoginButton() {
    const inputValues = this.#processUserInputValues(".input-field");
    const userAuthInfo = localStorage.get("userAuthInfo") || {};
    const isLoginSuccess = inputValues.every(
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

  #processUserInputValues(inputSelector) {
    const inputNodes = [...this.target.querySelectorAll(inputSelector)];
    const inputValues = inputNodes.map((node) => [node.id, node.value]);
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
