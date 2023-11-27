/**
 * Build a regex from a path that will allow us to match the route and extract the params
 */
export const buildRegexFromPath = (path: string): RegExp => {
  path = path.replace(/:(\w+)/g, (_: unknown, key: string) => {
    return `(?<${key}>[^/]+)`;
  });

  const source = `^(${path})$`;

  return new RegExp(source, "i");
};

/**
 * Find the current location from the URL query params, return '/' if not found
 */
export const findCurrentLocation = (): string => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("react_single_url_router_path") || "/";
};
