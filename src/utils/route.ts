import type { Route } from "../types";
import { joinPaths } from "./path";

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