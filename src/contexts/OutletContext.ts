import { createContext, useContext } from "react";

const OutletContext = createContext<React.ReactNode>(null)

export const useOutlet = () => useContext(OutletContext)

export default OutletContext