import arrowImage from "../assets/arrow.png"
import { Image } from "@chakra-ui/react";

const Arrow = () => {
  return (
    <Image objectFit="contain" transform="scaleX(-1)" scale={0.7} rotate="185deg" src={arrowImage} alt="Arrow" mt={8} px={2} height={40} width={40} />
  )
}

export default Arrow;