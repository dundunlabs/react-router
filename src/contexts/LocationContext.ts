import { createContext, useContext } from "react";

const LocationContext = createContext<Location | undefined>(undefined)

export function useLocation() {
  const location = useContext(LocationContext)
  if (!location) throw 'location not found'
  return location
}

export default LocationContext