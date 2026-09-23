import type { Location } from "../types"

interface Listener {
  (location: Location): void
}

export default class Router {
  _location: Location | undefined
  _push = (_to: string): Location => { throw 'missing method _push' }
  _replace = (_to: string): Location => { throw 'missing method _replace' }
  _go = (_delta: number): Location => { throw 'missing method _go' }

  #listeners = new Set<Listener>()

  #dispatch = (location: Location) => {
    this._location = location
    this.#listeners.forEach(fn => fn(location))
  }

  listen = (fn: Listener) => {
    this.#listeners.add(fn)
    return () => this.#listeners.delete(fn)
  }

  location = () => this._location

  push = (to: string) => {
    const location = this._push(to)
    this.#dispatch(location)
  }

  replace = (to: string) => {
    const location = this._replace(to)
    this.#dispatch(location)
  }

  go = (delta: number) => {
    const location = this._go(delta)
    this.#dispatch(location)
  }
}