import Component from "js/core/Component.mjs";
import LinesPage from "js/pages/LinesPage.mjs";
import StationsPage from "js/pages/StationsPage.mjs";
import SectionsPage from "js/pages/SectionsPage.mjs";
import LoginPage from "js/pages/LoginPage.mjs";
import SignupPage from "js/pages/SignupPage.mjs";
import IndexPage from "./pages/IndexPage.mjs";
import MapPage from "./pages/MapPage.mjs";
import SearchPage from "./pages/SearchPage.mjs";
import { localStorage } from "js/storage.mjs";
import { browserRoute, route } from "simple-vanilla-router";

export default class App extends Component {
  constructor(target) {
    super(target);
    browserRoute(this.routes.bind(this));
    this.routes();
  }

  routes() {
    route({
      path: "/",
      target: this.target,
      component: IndexPage,
    });

    route({
      path: "/lines",
      target: this.target,
      component: LinesPage,
      state: {
        lineList: localStorage.get("lineList") || [],
      },
    });

    route({
      path: "/stations",
      target: this.target,
      component: StationsPage,
      state: {
        stationList: localStorage.get("stationList") || [],
      },
    });

    route({
      path: "/sections",
      target: this.target,
      component: SectionsPage,
      state: {
        lineList: localStorage.get("lineList") || [],
        stationList: localStorage.get("stationList") || [],
        selectColor: "",
        selectedIndex: 0,
      },
    });

    route({
      path: "/map",
      target: this.target,
      component: MapPage,
    });

    route({
      path: "/search",
      target: this.target,
      component: SearchPage,
    });

    route({
      path: "/login",
      target: this.target,
      component: LoginPage,
    });

    route({
      path: "/signup",
      target: this.target,
      component: SignupPage,
    });
  }
}
