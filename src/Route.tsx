import { FunctionComponent } from "react"

export type RouteProps = {
  path: string,
  component: FunctionComponent,
  root?: false
  default?: false
} | {
  path?: string,
  component: FunctionComponent,
  root: true
  default?: boolean
} | {
  path?: string,
  component: FunctionComponent,
  root?: boolean
  default: true
} 

/**
 * The component that allows us to register a route
 */
const Route = (props: RouteProps) => props && null

export {Route}