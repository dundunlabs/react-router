import { useMemo } from "react"
import { indexRoutes, matchRouteIndexes } from "../utils/route"
import { useLocation } from "../contexts/LocationContext"
import type { Route as RouteObject } from "../types"
import Route from "./Route"

interface RoutesProps {
  routes: RouteObject[]
}

export default function Routes({ routes }: RoutesProps) {
  const { pathname } = useLocation()
  const routeIndexes = useMemo(() => indexRoutes(routes), [routes])
  const match = useMemo(() => matchRouteIndexes(routeIndexes, pathname), [routeIndexes, pathname])

  if (!match) return null

  return renderRoutes(routes, match.indexes)
}

function renderRoutes(routes: RouteObject[], indexes: number[]) {
  return routes.map(({ Component, element, children = [] }, idx) => {
    const [currIdx, ...childIndexes] = indexes

    if (idx !== currIdx) return null

    return (
      <Route key={idx} Component={Component} element={element}>
        {renderRoutes(children, childIndexes)}
      </Route>
    )
  })
}