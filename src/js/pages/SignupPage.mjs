import "css/pages/auth.css";
import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { localStorage } from "js/storage.mjs";
import { MESSAGE } from "js/constants.mjs";
import { redirect } from "simple-vanilla-router";

export default class SignupPage extends Component {
  mounted() {
    const rootElement = this.target;
    this.header = new Header(rootElement);
  }

  render() {
    const mainElement = this.target.querySelector("main");

    mainElement.innerHTML = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
        <h2 class="text">📝 회원가입</h2>
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
              <label for="name" class="input-label" hidden>이름</label>
              <input
              type="text"
              id="name"
              name="name"
              class="input-field"
              placeholder="이름"
              required
              />
          </div>
          <div class="input-control">
              <label for="password" class="input-label" hidden
              >비밀번호</label
              >
              <input
              type="password"
              id="password"
              name="password"
              class="input-field"
              placeholder="비밀번호"
              />
          </div>
          <div class="input-control">
              <label for="password-confirm" class="input-label" hidden
              >비밀번호 확인</label
              >
              <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              class="input-field"
              placeholder="비밀번호 확인"
              />
          </div>
          <div class="input-control">
              <button
              type="button"
              name="submit"
              class="input-submit w-100 bg-cyan-300"
              >
              확인
              </button>
          </div>
        </form>
      </div>
    `;
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: ".input-submit",
      callback: this.handleSignupButton,
    });
  }

  /**
   * @todo 유효성 검사 추가
   * @todo 로컬스토리지 -> API
   */
  handleSignupButton() {
    const userAuthInfo = this.#processUserInputValues(".input-field");
    const [isConfirmedPassword, isEmptyInput] =
      this.#checkValidation(userAuthInfo);

    if (isEmptyInput) {
      alert(MESSAGE.INPUT_EMPTY);
      return;
    }

    if (!isConfirmedPassword) {
      alert(MESSAGE.PASSWORD_DISCORD);
      return;
    }

    localStorage.set("userAuthInfo", userAuthInfo);
    redirect("/");
  }

  #processUserInputValues(inputSelector) {
    const userAuthInfo = {};
    const inputNodes = [...this.target.querySelectorAll(inputSelector)];
    const inputValues = inputNodes.map((node) => [node.id, node.value]);
    inputValues.forEach(([key, value]) => (userAuthInfo[key] = value));
    return userAuthInfo;
  }

  #checkValidation(userAuthInfo) {
    const { password, "password-confirm": passwordConfirm } = userAuthInfo;
    const isConfirmedPassword = password === passwordConfirm;
    const isEmptyInput = Object.values(userAuthInfo).some((value) => !value);
    return [isConfirmedPassword, isEmptyInput];
  }
}
