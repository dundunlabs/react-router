import { useSyncExternalStore } from "react";
import LocationContext from "../contexts/LocationContext";
import RouterContext from "../contexts/RouterContext";
import type Router from "../routers/Router";

type RouterProviderProps = React.PropsWithChildren<{
  router: Router
}>

export default function RouterProvider({ router, children }: RouterProviderProps) {
  const location = useSyncExternalStore(router.listen, router.location)

  return (
    <RouterContext value={router}>
      <LocationContext value={location}>
        {children}
      </LocationContext>
    </RouterContext>
  )
}