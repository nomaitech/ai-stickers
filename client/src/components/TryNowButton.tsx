import { Link as RouterLink } from "react-router-dom";
import RouterButton from "./RouterButton";
type TryNowButtonProps = {
  text?: string;
};

const TryNowButton = ({ text = "Try Now" }: TryNowButtonProps) => {
  return (
    <RouterButton
      as={RouterLink}
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
    </RouterButton>
  );
};

export default TryNowButton;
