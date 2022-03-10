import Component from "../core/Component.mjs";
import { redirect } from "../router.mjs";

export default class Header extends Component {
  render() {
    this.target.querySelector("header").innerHTML = `
      <a href="/" class="text-black">
        <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
        <a href="/stations" class="my-1">
          <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
        </a>
        <a href="/lines" class="my-1">
          <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
        </a>
        <a href="/sections" class="my-1">
          <button class="btn bg-white shadow mx-1">🔁 구간 관리</button>
        </a>
        <a href="/map" class="my-1">
          <button class="btn bg-white shadow mx-1">🗺️ 전체 보기</button>
        </a>
        <a href="/search" class="my-1">
          <button class="btn bg-white shadow mx-1">🔎 길 찾기</button>
        </a>
        <a href="/login" class="my-1">
          <button class="btn bg-white shadow mx-1">👤 로그인</button>
        </a>
      </nav>
    `;
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: "header",
      callback: this.onClickRedirect,
    });
  }

  onClickRedirect(e) {
    e.preventDefault();

    const linkElement = e.target.closest("a");
    if (!linkElement) return;

    const pathname = `/${linkElement.href.split("/")[3]}`;
    redirect(pathname);
  }
}
