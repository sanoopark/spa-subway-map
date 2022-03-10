import "css/index.css";
import "js/ui/modal/index.mjs";
import App from "js/App.mjs";

const rootElement = document.querySelector("#app");
const appState = { isLoggedIn: false };

new App(rootElement, appState);
