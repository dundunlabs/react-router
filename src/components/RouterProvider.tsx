import { useEffect, useSyncExternalStore } from "react";
import LocationContext from "../contexts/LocationContext";
import RouterContext from "../contexts/RouterContext";
import type Router from "../routers/Router";
import BrowserRouter from "../routers/BrowserRouter";

type RouterProviderProps = React.PropsWithChildren<{
  router: Router
}>

export default function RouterProvider({ router, children }: RouterProviderProps) {
  const location = useSyncExternalStore(router.listen, router.location)
  useEffect(() => router instanceof BrowserRouter ? router.onPopState() : undefined, [router])

  return (
    <RouterContext value={router}>
      <LocationContext value={location}>
        {children}
      </LocationContext>
    </RouterContext>
  )
}