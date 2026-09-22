import { createContext, useContext } from "react";

const ParamsContext = createContext<Record<string, string>>({})

export const useParams = () => useContext(ParamsContext)

export default ParamsContext