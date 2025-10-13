import { Button, Flex, Text, Image } from "@chakra-ui/react";
import gallery1 from "../assets/gallery/gallery1.png";
import gallery2 from "../assets/gallery/gallery2.png";
import gallery3 from "../assets/gallery/gallery3.png";
import gallery4 from "../assets/gallery/gallery4.png";
import gallery5 from "../assets/gallery/gallery5.png";
import gallery6 from "../assets/gallery/gallery6.png";
import { useNavigate } from "react-router-dom";

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Gallery = () => {  
  const navigate = useNavigate();
  return (
    <Flex p={4} flexDirection="column">
      <Text fontSize="3xl" fontWeight="semibold">Discover endless ways to turn your photos into stickers</Text>
      <Flex my={4} gap={4} flexWrap="wrap">
        {galleryImages.map((image, index) => (
          <Flex key={index} alignItems="center" justifyContent="center">
            <Image height={180} src={image} alt="Placeholder" />
          </Flex>
        ))}
      </Flex>
  
      <Flex justify="center" my={4}>
        <Button onClick={() => navigate("/generate-sticker")} w="full" size="2xl" variant="solid" colorPalette="gray">
          Try Now
        </Button>
      </Flex>
    </Flex>
  );
};

export default Gallery;