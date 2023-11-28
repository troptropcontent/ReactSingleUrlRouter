import { FunctionComponent } from "react"

export type RouteProps = {
  path: string,
  component: FunctionComponent,
  root: boolean
}
/**
 * The component that allows us to register a route
 */
const Route = ({path, component, root}: RouteProps) => component

export {Route}