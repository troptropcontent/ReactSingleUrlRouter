import { ReactNode, useContext } from "react"
import { RouterContext } from "./Router"

/**
 * The component that allows us to navigate to a route
 */
type LinkProps = {
  onClick?: null
  to: string
  className?: string
  children: ReactNode
} | {
  onClick: () => void
  to?: null
  className?: string
  children: ReactNode
}

const Link = ({to, className, onClick, children}: LinkProps) => {
  const router_context = useContext(RouterContext)
  if(!router_context) {
    throw new Error("Link must be used inside a Router component")
  }
  const {navigate} = router_context

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick ? onClick() : navigate(to)
  }
  return <a href={to || "#"} onClick={handleClick} className={className}>{children}</a>
}

export {Link}