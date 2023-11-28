import { FunctionComponent } from "react"

export type RouteProps = {
  path?: string,
  component: FunctionComponent,
  root?: boolean
  default?: boolean
} 

/**
 * The component that allows us to register a route
 */
const Route = (props: RouteProps) => props && null

export {Route}