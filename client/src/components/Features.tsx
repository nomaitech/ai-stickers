import { Flex, Text, Image, Box } from "@chakra-ui/react";
import PrimaryButton from "./PrimaryButton";
import telegramIntegration from "../assets/telegram.png";
import DogReal from "../assets/dog-real.png";
import DogSticker from "../assets/dog-sticker.png";
import Arrow from "./Arrow";
import Section from "./Section";

const Features = () => {
  return (
    <Section>
      <Flex flexDirection="column">
        <Text fontSize="3xl" textAlign="center" fontWeight="semibold">How It Works</Text>
        <Flex my={4} flexDirection="column" gap={4}>
          <Text bgGradient="to-r" gradientFrom="purple.400" gradientTo="pink.400" bgClip='text' fontSize="lg" fontWeight="semibold">AI-Powered Sticker Generation</Text>
          <Text fontSize="md" color="fg.muted">Our advanced AI transforms your photos into professional stickers with transparent backgrounds. Upload any image and watch it become a perfect sticker in seconds, optimized for Telegram.</Text>
          <Flex flexDirection="row">
            <Box p={2}>
              <Image borderRadius={8} my={4} alignSelf="center" width={200} src={DogReal} alt="Dog Real" />
            </Box>
            <Box>
              <Box>
                <Arrow />
              </Box>
              <Image alignSelf="center" width={250} src={DogSticker} alt="Dog Sticker" />
            </Box>
          </Flex>
          <PrimaryButton text="Discover Community Stickers" to="/explore" />
        </Flex>
        <Flex my={4} flexDirection="column" gap={4}>
          <Text bgGradient="to-r" gradientFrom="purple.400" gradientTo="cyan.400" bgClip='text' fontSize="lg" fontWeight="semibold">Customize with AI Instructions</Text>
          <Text fontSize="md" color="fg.muted">Want to add a specific style, mood, or effect? Simply describe what you want and our AI will apply your creative vision. Change expressions, add accessories, or transform the art style with simple text instructions.</Text>
          <Image borderRadius={19} my={4} alignSelf="center" w="full" src="https://placehold.co/380x250" alt="Telegram Integration" />
          <PrimaryButton text="Start Creating" to="/generate-sticker" />
        </Flex>
        <Flex my={4} flexDirection="column" gap={4}>
          <Text bgGradient="to-r" gradientFrom="pink.400" gradientTo="orange.400" bgClip='text' fontSize="lg" fontWeight="semibold">Build Complete Sticker Packs</Text>
          <Text fontSize="md" color="fg.muted">Create, organize, and publish your stickers as full Telegram sticker packs. Add or remove stickers anytime, customize emojis, and share your pack instantly with a unique Telegram link.</Text>
          <Image borderRadius={4} my={4} alignSelf="center" width={200} src={telegramIntegration} alt="Telegram Integration" />
          <PrimaryButton text="Create Your Pack" to="/generate-sticker" />
        </Flex>
      </Flex>
    </Section>
  );
};

export default Features;