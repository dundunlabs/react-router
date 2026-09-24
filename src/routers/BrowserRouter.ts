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

  _go = (delta: number) => {
    history.go(delta)
    return undefined
  };

  #handlePopState = () => {
    const location = currentLocation()
    this._setLocation(location)
  }

  onPopState = () => {
    window.addEventListener('popstate', this.#handlePopState)
    return () => window.removeEventListener('popstate', this.#handlePopState)
  }
}

function currentLocation(): Location {
  const { pathname, hash, search } = location
  return { pathname, hash, search }
}