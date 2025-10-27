import { Flex, Text, Image, Grid } from "@chakra-ui/react";
import gallery1 from "../assets/gallery/gallery1.png";
import gallery2 from "../assets/gallery/gallery2.png";
import gallery3 from "../assets/gallery/gallery3.png";
import gallery4 from "../assets/gallery/gallery4.png";
import gallery5 from "../assets/gallery/gallery5.png";
import gallery6 from "../assets/gallery/gallery6.png";
import PrimaryButton from "./PrimaryButton";
import Section from "./Section";

const galleryImages = [{ id: 1, image: gallery1, backgroundColor: "pink.50" }, { id: 2, image: gallery2, backgroundColor: "purple.50" }, { id: 3, image: gallery3, backgroundColor: "cyan.50" }, { id: 4, image: gallery4, backgroundColor: "yellow.50" }, { id: 5, image: gallery5, backgroundColor: "orange.50" }, { id: 6, image: gallery6, backgroundColor: "green.50" }];

const Gallery = () => {
  return (
    <Section>
      <Flex flexDirection="column">
        <Text mt={8} lineHeight="38px" fontFamily="body" fontSize="3xl" fontWeight="semibold">Endless ways to turn your <Text as="span" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">photos into stickers</Text></Text>
        <Grid my={4} gap={4} templateColumns="repeat(2, 1fr)">
          {galleryImages.map((image, index) => (
            <Flex borderRadius={10} backgroundColor={image.backgroundColor} key={index} alignItems="center" justifyContent="center">
              <Image height={180} src={image.image} alt="Placeholder" />
            </Flex>
          ))}
        </Grid>

        <Flex justify="center" my={4}>
          <PrimaryButton text="Try for free" to="/generate-sticker" />
        </Flex>
      </Flex>
    </Section>
  );
};

export default Gallery;