import Component from "js/core/Component.mjs";
import Header from "js/components/Header.mjs";
import LinesPage from "js/pages/LinesPage.mjs";
import StationsPage from "js/pages/StationsPage.mjs";
import SectionsPage from "js/pages/SectionsPage.mjs";
import LoginPage from "js/pages/LoginPage.mjs";
import SignupPage from "js/pages/SignupPage.mjs";
import IndexPage from "./pages/IndexPage.mjs";
import { browserRoute, route } from "./router.mjs";

export default class App extends Component {
  constructor(props) {
    super(props);
    browserRoute(this.routes);
    this.routes();
  }

  routes() {
    route({
      path: [/^\/?$/i],
      component: IndexPage,
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
    });

    route({
      path: [/^\/signup\/?$/i],
      component: SignupPage,
    });
  }

  render() {
    console.log(this.target);

    this.target.innerHTML = `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4"></header>
          <main class="mt-10 d-flex justify-center"></main>
        </div>
      </div>
    `;

    new Header(this.target);
  }
}
