import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { useCurrentLocation } from './services/hooks'
import { findCurrentLocation } from './services/utils'

type RouterContextType = {
  location: string,
  navigate: (path: string) => void
} | null
const RouterContext = createContext<RouterContextType>(null)

type RouterProps = {
  children: ReactNode
}
const Router = ({children}: RouterProps) => {
  const currentLocation = useCurrentLocation()
  const [location, setLocation] = useState<string>(currentLocation)
  const navigate = (newLocation: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("react_single_url_router_path", newLocation);
    window.history.pushState({}, "", url);
    setLocation(newLocation)
  }

  const handleHashChange = useCallback(() => {
    setLocation(findCurrentLocation());
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

export default Router