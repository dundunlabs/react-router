export function joinPaths(...paths: string[]) {
  const joinedPath = paths
    .map(path => path.replaceAll(/(^\/+|\/+$)/g, ''))
    .filter(Boolean)
    .join('/')

  return '/' + joinedPath
}