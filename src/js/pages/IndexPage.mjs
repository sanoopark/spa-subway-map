import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import subwayEmoji from "images/subway_emoji.png";
import { store } from "../core/store.js";

export default class IndexPage extends Component {
  mounted() {
    const rootElement = this.target;
    this.header = new Header(rootElement);
  }

  render() {
    const { isLoggedIn } = store.state;
    const mainElement = this.target.querySelector("main");

    mainElement.innerHTML = `
      <div class="d-flex flex-col">
        <div class="d-flex justify-center">
          <img src="${subwayEmoji}" width="200" />
        </div>
        ${
          isLoggedIn
            ? ``
            : `<p class="mt-0 text-center">지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.</p>`
        }
      </div>
    `;
  }
}
