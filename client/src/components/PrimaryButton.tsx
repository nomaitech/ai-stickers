import { Button, type ButtonProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";
type PrimaryButtonProps = ButtonProps & {
  text?: string;
  to?: string;
};

const PrimaryButton = ({ text = "Try Now", to, ...props }: PrimaryButtonProps) => {
  return (
    <Button
      asChild={to ? true : false}
      backgroundColor="orange.300"
      w="full"
      size="xl"
      variant="solid"
      fontWeight="800"
      colorPalette="gray"
      color="orange.800"
      _hover={{ textDecoration: "none", backgroundColor: "orange.400", color: "orange.950" }}
      {...props}
    >
      {to ? (
        <Link to={to}>{text}</Link>
      ) : (
        text
      )}
    </Button>
  );
};

export default PrimaryButton;
