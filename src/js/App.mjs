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
  constructor(target) {
    super(target);
    browserRoute(this.routes.bind(this));
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
}
