import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type TryNowButtonProps = {
  text?: string;
};

const TryNowButton = ({ text = "Try Now" }: TryNowButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button backgroundColor="orange.300" onClick={() => navigate("/generate-sticker")} w="full" size="xl" variant="solid" fontWeight="800" colorPalette="gray">
      <Text color="orange.800">{text}</Text>
    </Button>
    )
};

export default TryNowButton;