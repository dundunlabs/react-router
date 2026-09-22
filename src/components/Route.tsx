import OutletContext from "../contexts/OutletContext";
import Outlet from "./Outlet";
import type { Route as RouteObject } from "../types";

type RouteProps = React.PropsWithChildren<Pick<RouteObject, 'Component' | 'element'>>

export default function Route({
  Component = Outlet,
  element = <Component />,
  children
}: RouteProps) {
  return (
    <OutletContext value={children}>
      {element}
    </OutletContext>
  )
}