export const redirect = (path) => {
  const { pathname } = window.location;

  if (path === pathname) return;

  const locationChangeEvent = new CustomEvent("locationchange", {
    detail: { href: path },
  });

  window.dispatchEvent(locationChangeEvent);
};

export const browserRoute = (callback) => {
  const handleLocationChange = (e) => {
    const { href } = e.detail;

    window.history.pushState(null, "", href);
    callback();
  };

  window.addEventListener("locationchange", handleLocationChange);
  window.addEventListener("popstate", callback);
};

const rootElement = document.body.firstElementChild;

export const route = ({
  path: targetRegex,
  component,
  target = rootElement,
  state = {},
}) => {
  const { pathname: currentPath } = window.location;

  if (Array.isArray(targetRegex)) {
    const isRouteRequired = targetRegex.some((regex) =>
      regex.test(currentPath)
    );
    isRouteRequired && new component(target, state);
    return;
  }

  const isRouteRequired = targetRegex.test(currentPath);
  isRouteRequired && new component(target, state);
};
