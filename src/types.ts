export interface Route {
  path?: string
  Component?: React.ElementType
  element?: React.ReactNode
  children?: this[]
}