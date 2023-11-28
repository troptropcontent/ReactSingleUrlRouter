import { useContext } from "react";
import { findCurrentLocation } from "./utils";
import { RouterContext } from "../Router";

export const useCurrentLocation = (): string => findCurrentLocation();

export const useLocation = (): {
  pathName: string;
  queryParams: object;
} => {
  const router_context = useContext(RouterContext);
  if (!router_context) {
    throw new Error("useLocation must be used inside a Router component");
  }
  const { location } = router_context;
  const dummyUrl = new URL(location, "http://www.example.com");
  const pathName = dummyUrl.pathname;
  const queryParams = Object.fromEntries(dummyUrl.searchParams);

  return { pathName, queryParams };
};

/**
 * This hooks allow use to access the function that allows us to navigate to a new path
 */
const useNavigate = (): ((path: string) => void) => {
  const router_context = useContext(RouterContext);
  if (!router_context) {
    throw new Error("useNavigate must be used inside a Router component");
  }
  const { navigate } = router_context;

  return navigate;
};
export { useNavigate };
