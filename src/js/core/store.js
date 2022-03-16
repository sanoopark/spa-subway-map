import { observable } from "./observer.js";

export const store = {
  state: observable({
    isLoggedIn: false,
  }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state.hasOwnProperty(key)) {
        throw new Error(`'${key}' state is not in the store.`);
      }
      this.state[key] = value;
    }
  },
};
