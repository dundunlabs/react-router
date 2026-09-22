import type { Location } from "../types";
import Router from "./Router";

export default class BrowserRouter extends Router {
  _location = currentLocation()

  _push = (to: string) => {
    history.pushState(null, '', to)
    return currentLocation()
  };

  _replace = (to: string) => {
    history.replaceState(null, '', to)
    return currentLocation()
  };
}

function currentLocation(): Location {
  const { pathname, hash, search } = location
  return { pathname, hash, search }
}