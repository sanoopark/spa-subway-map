const currentObserverAccessor = () => {
  let _currentObserver = null;

  return {
    get: () => _currentObserver,
    set: (newObserver) => (_currentObserver = newObserver),
  };
};

const currentObserver = currentObserverAccessor();

export const observe = ({ target, observer }) => {
  currentObserver.set({ target, observer });
  observer();
  currentObserver.set({ target: null, observer: null });
};

export const observable = (state) => {
  Object.entries(state).forEach(([key, value]) => {
    redefineState(state, key, value);
  });
  return state;
};

const redefineState = (state, key, value) => {
  const observers = new Set();
  const targets = new Set();
  let currentValue = value;

  Object.defineProperty(state, key, {
    get() {
      const { target, observer } = currentObserver.get();
      const isNotObserving = target && !targets.has(target);
      if (isNotObserving) {
        observers.add(observer);
        targets.add(target);
      }
      return currentValue;
    },
    set(newValue) {
      currentValue = newValue;
      observers.forEach((observer) => observer());
    },
  });
};
