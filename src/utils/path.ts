export function joinPaths(...paths: string[]) {
  const joinedPath = paths
    .map(path => path.replaceAll(/(^\/+|\/+$)/g, ''))
    .filter(Boolean)
    .join('/')

  return '/' + joinedPath
}

export function matchPath(path: string, pathname: string) {
  const pattern = path
    .replaceAll(/\/:[^/]+/g, key => `/(?<${key.slice(2)}>[^/]*)`)
  const regex = new RegExp(`^${pattern}$`)

  const match = pathname.match(regex)
  if (!match) return null

  return match.groups || {}
}