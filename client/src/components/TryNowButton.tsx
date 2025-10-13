import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type TryNowButtonProps = {
  text?: string;
};

const TryNowButton = ({ text = "Try Now" }: TryNowButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/generate-sticker")} w="full" size="2xl" variant="solid" colorPalette="gray">
      {text}
    </Button>
    )
};

export default TryNowButton;