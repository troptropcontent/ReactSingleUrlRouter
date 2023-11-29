import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { findCurrentLocation } from './services/utils'

type RouterContextType = {
  location: string,
  navigate: (path: string) => void
} | null
const RouterContext = createContext<RouterContextType>(null)

type RouterProps = {
  queryKey?: string,
  children: ReactNode
}
/**
 * The base component that will provide the Router context
 */
const Router = ({queryKey = "react_static_url_router", children}: RouterProps) => {
  const currentLocation = () => findCurrentLocation(queryKey)
  const [location, setLocation] = useState<string>(currentLocation())
  const navigate = (newLocation: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(queryKey, newLocation);
    window.history.pushState({}, "", url);
    setLocation(newLocation)
  }

  const handleHashChange = useCallback(() => {
    setLocation(currentLocation());
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handleHashChange);
    return () => window.removeEventListener("popstate", handleHashChange);
  }, [handleHashChange]);

  const contextValue: RouterContextType = {location,navigate}
  return (
    <RouterContext.Provider value={contextValue}>
     {children}
    </RouterContext.Provider>
  )
}

export {
  Router,
  RouterContext
} 