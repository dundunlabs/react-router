import { joinPaths, matchPath } from "./path";
import type { Route } from "../types";

export const indexRoutes = (routes: Route[]) => routes.reduce((indexes, { path = '', children }, index) => {
  if (children) {
    indexRoutes(children).forEach((v, k) => {
      indexes.set(joinPaths(path, k), [index, ...v])
    })
  } else {
    indexes.set(joinPaths(path), [index])
  }

  return indexes
}, new Map<string, number[]>())

export function matchRouteIndexes(routeIndexes: Map<string, number[]>, pathname: string) {
  for (const [path, indexes] of routeIndexes) {
    const params = matchPath(path, pathname)
    if (params) return { path, indexes, params }
  }
  return null
}