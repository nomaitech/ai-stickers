import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type TryNowButtonProps = {
  text?: string;
};

const TryNowButton = ({ text = "Try Now" }: TryNowButtonProps) => {
  return (
    <Button
      as={RouterLink}
      //@ts-expect-error Typescript doesn't understand that this Button acts as Link
      to="/generate-sticker"
      backgroundColor="orange.300"
      w="full"
      size="xl"
      variant="solid"
      fontWeight="800"
      colorPalette="gray"
      color="orange.800"
    >
      {text}
    </Button>
  );
};

export default TryNowButton;
