export interface Route {
  path?: string
  Component?: React.ElementType
  element?: React.ReactNode
  children?: this[]
}

export type Location = Pick<globalThis.Location, 'pathname' | 'hash' | 'search'>