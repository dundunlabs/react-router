import LocationContext from "../contexts/LocationContext";

type RouterProviderProps = React.PropsWithChildren

export default function RouterProvider({ children }: RouterProviderProps) {
  return (
    <LocationContext value={location}>
      {children}
    </LocationContext>
  )
}