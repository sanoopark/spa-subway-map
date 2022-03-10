import Component from "./core/Component.mjs";
import Header from "./components/Header.mjs";
import LinesPage from "./pages/LinesPage.mjs";

export default class App extends Component {
  constructor(props) {
    super(props);

    new Header(this.target);
    new LinesPage(this.target);
  }

  render() {
    this.target.innerHTML = `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4"></header>
          <main class="mt-10 d-flex justify-center">
            <div class="d-flex flex-col">
              <div class="d-flex justify-center">
                <img src="src/images/subway_emoji.png" width="200" />
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
