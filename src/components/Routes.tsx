import { useMemo } from "react"
import { indexRoutes, matchRouteIndexes } from "../utils/route"
import { useLocation } from "../contexts/LocationContext"
import Route from "./Route"
import ParamsContext from "../contexts/ParamsContext"
import type { Route as RouteObject } from "../types"

interface RoutesProps {
  routes: RouteObject[]
}

export default function Routes({ routes }: RoutesProps) {
  const { pathname } = useLocation()
  const routeIndexes = useMemo(() => indexRoutes(routes), [routes])
  const match = useMemo(() => matchRouteIndexes(routeIndexes, pathname), [routeIndexes, pathname])

  if (!match) return null

  return (
    <ParamsContext value={match.params}>
      {renderRoutes(routes, match.indexes)}
    </ParamsContext>
  )
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