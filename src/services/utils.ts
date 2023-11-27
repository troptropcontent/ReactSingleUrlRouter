/**
 * Build a regex from a path that will allow us to match the route and extract the params
 */
export const buildRegexFromPath = (path: string): RegExp => {
  path = path.replace(/:(\w+)/g, (_: unknown, key: string) => {
    return `(?<${key}>[^/]+)`
  })

  const source = `^(${path})$`

  return new RegExp(source, "i")
}