import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import { localStorage } from "js/storage.mjs";
import subwayEmoji from "images/subway_emoji.png";

export default class IndexPage extends Component {
  render() {
    const mainElement = this.target.querySelector("main");
    const isLoggedIn = localStorage.get("isLoggedIn");

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

    new Header(this.target, { isLoggedIn });
  }
}
