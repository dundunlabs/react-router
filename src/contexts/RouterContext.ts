import { createContext, useContext } from "react";
import type Router from "../routers/Router";

const RouterContext = createContext<Router | undefined>(undefined)

export function useRouter() {
  const router = useContext(RouterContext)
  if (!router) throw 'router not found'
  return router
}

export default RouterContext