import { FunctionComponent } from "react";

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

type MatchedRoute = {
  params: Record<string, string>;
  component: FunctionComponent;
};

/**
 * Finds the root route from the routes array if it exists
 */
export const findRootRoute = (routes: JSX.Element[]): MatchedRoute | null => {
  let rootRoute: null | MatchedRoute = null;

  for (const route of routes) {
    if (route.props.root) {
      rootRoute = {
        params: {},
        component: route.props.component,
      };
      break;
    }
  }

  return rootRoute;
};

/**
 * Finds the default route from the routes array if it exists
 */
export const findDefaultRoute = (
  routes: JSX.Element[],
): MatchedRoute | null => {
  let defaultRoot: null | MatchedRoute = null;

  for (const route of routes) {
    if (route.props.default) {
      defaultRoot = {
        params: {},
        component: route.props.component,
      };
      break;
    }
  }

  return defaultRoot;
};

/**
 * Finds the matching route from the routes array if it exists
 */
export const findMatchingRoute = (
  routes: JSX.Element[],
  path: string,
): MatchedRoute | null => {
  let matchingRoute: null | MatchedRoute = null;

  for (const route of routes.filter((route) => route.props.path)) {
    const regex = buildRegexFromPath(route.props.path);
    const match = path.match(regex);
    if (match) {
      const params = match.groups || {};
      matchingRoute = {
        params,
        component: route.props.component,
      };
      break;
    }
  }

  return matchingRoute;
};
