import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import LinesPage from "js/pages/LinesPage.mjs";
import StationsPage from "js/pages/StationsPage.mjs";
import SectionsPage from "js/pages/SectionsPage.mjs";
import LoginPage from "js/pages/LoginPage.mjs";
import SignupPage from "js/pages/SignupPage.mjs";
import subwayEmoji from "images/subway_emoji.png";
import { browserRoute, redirect, route } from "./router.mjs";

export default class App extends Component {
  constructor(props) {
    super(props);

    new Header(this.target);
    browserRoute(this.routes);
    this.routes();
  }

  routes() {
    route({
      path: [/^\/lines\/?$/i],
      component: LinesPage,
      target: this.target,
    });

    route({
      path: [/^\/stations\/?$/i],
      component: StationsPage,
      target: this.target,
    });

    route({
      path: [/^\/sections\/?$/i],
      component: SectionsPage,
      target: this.target,
    });

    route({
      path: [/^\/login\/?$/i],
      component: LoginPage,
      target: this.target,
    });

    route({
      path: [/^\/signup\/?$/i],
      component: SignupPage,
      target: this.target,
    });
  }

  render() {
    this.target.innerHTML = `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4"></header>
          <main class="mt-10 d-flex justify-center">
            <div class="d-flex flex-col">
              <div class="d-flex justify-center">
                <img src="${subwayEmoji}" width="200" />
              </div>
              <p class="mt-0 text-center">
                지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.
              </p>
            </div>
          </main>
        </div>
      </div>
    `;
  }
}
