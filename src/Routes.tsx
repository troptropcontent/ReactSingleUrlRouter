import { createContext} from "react"
import { findDefaultRoute, findMatchingRoute, findRootRoute } from "./services/utils"
import { useLocation } from "./services/hooks";

const RouteContext = createContext({params: {}});

/**
 * This component conatins all the routes and is responsible of selecting the relevant one to render.
 */
const Routes = ({children}: {children: JSX.Element[]} ) => {
  const {pathName, queryParams} = useLocation()

  let route = pathName === "/" ? findRootRoute(children) : findMatchingRoute(children, pathName)

  route = route || findDefaultRoute(children)

  if (route === null) return null

  return <RouteContext.Provider value={{params: {...route.params, ...queryParams}}}>
    <route.component/> 
  </RouteContext.Provider>
  
}

export {Routes, RouteContext} 


