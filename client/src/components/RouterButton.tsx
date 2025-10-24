import { Button, type ButtonProps } from "@chakra-ui/react"
import { Link as RouterLink, type LinkProps } from "react-router-dom"

type RouterButtonProps = ButtonProps & LinkProps

const RouterButton = (props: RouterButtonProps) => (
  <Button as={RouterLink} {...props} />
)

export default RouterButton;