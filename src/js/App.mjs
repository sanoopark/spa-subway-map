import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import LinesPage from "js/pages/LinesPage.mjs";
import StationsPage from "js/pages/StationsPage.mjs";
import SectionsPage from "js/pages/SectionsPage.mjs";
import LoginPage from "js/pages/LoginPage.mjs";
import SignupPage from "js/pages/SignupPage.mjs";
import IndexPage from "./pages/IndexPage.mjs";
import { browserRoute, route } from "./router.mjs";
import { localStorage } from "./storage.mjs";

export default class App extends Component {
  constructor(target, props) {
    super(target, props);
    browserRoute(this.routes.bind(this));
    this.routes();
  }

  routes() {
    route({
      path: [/^\/?$/i],
      component: IndexPage,
      state: { isLoggedIn },
    });

    route({
      path: [/^\/lines\/?$/i],
      component: LinesPage,
    });

    route({
      path: [/^\/stations\/?$/i],
      component: StationsPage,
    });

    route({
      path: [/^\/sections\/?$/i],
      component: SectionsPage,
    });

    route({
      path: [/^\/login\/?$/i],
      component: LoginPage,
      state: { setIsLoggedIn: this.setIsLoggedIn.bind(this) },
    });

    route({
      path: [/^\/signup\/?$/i],
      component: SignupPage,
    });

    const isLoggedIn = localStorage.get("isLoggedIn");
    this.header = new Header(this.target, { isLoggedIn });
  }

  setIsLoggedIn(isLoggedIn) {
    this.header.setState({ isLoggedIn });
  }

  render() {
    this.target.innerHTML = `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4"></header>
          <main class="mt-10 d-flex justify-center"></main>
        </div>
      </div>
    `;
  }
}
