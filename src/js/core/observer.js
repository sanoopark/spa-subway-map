const currentObserver = { component: null, observer: null };

const setCurrentObserver = ({ component, observer }) => {
  currentObserver.component = component;
  currentObserver.observer = observer;
};

export const observe = ({ component, observer }) => {
  setCurrentObserver({ component, observer });
  observer();
  setCurrentObserver({ component: null, observer: null });
};

export const observable = (state) => {
  Object.entries(state).forEach(([key, value]) => {
    makeObservable(state, key, value);
  });

  return state;
};

const makeObservable = (state, key, value) => {
  const observers = new Set();
  const components = new Set();
  let currentValue = value;

  Object.defineProperty(state, key, {
    get() {
      const { component, observer } = currentObserver;
      const isNotObserving = component && !components.has(component);

      if (isNotObserving) {
        observers.add(observer);
        components.add(component);
      }

      return currentValue;
    },
    set(newValue) {
      currentValue = newValue;
      observers.forEach((observer) => observer());
    },
  });
};
