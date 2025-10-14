import { Flex, Text, Image, Box } from "@chakra-ui/react";
import TryNowButton from "./TryNowButton";
import telegramIntegration from "../assets/telegram.png";
import DogReal from "../assets/dog-real.png";
import DogSticker from "../assets/dog-sticker.png";
import Arrow from "./Arrow";


const Features = () => {
  return (
    <Flex flexDirection="column">
      <Text fontSize="3xl" textAlign="center" fontWeight="semibold">Features</Text>
      <Flex my={4} flexDirection="column" gap={4}>
        <Text bgGradient="to-r" gradientFrom="purple.400" gradientTo="pink.400" bgClip='text' fontSize="lg" fontWeight="semibold">Turn Photos into Stickers</Text>
        <Text fontSize="sm" color="fg.muted">Upload any photo and get a clean, high-quality sticker with transparent background, ready to download.</Text>
        <Flex flexDirection="row">
          <Box p={2}>
          <Image borderRadius={8} my={4} alignSelf="center" width={200} src={DogReal} alt="Dog Real" />
          </Box>
          <Box>
            <Box>
              <Arrow/>
            </Box>
            <Image alignSelf="center" width={250} src={DogSticker} alt="Dog Sticker" />
          </Box>
        </Flex>
        <TryNowButton text="Create Your Own Stickers" />
      </Flex>
      <Flex my={4} flexDirection="column" gap={4}>
        <Text bgGradient="to-r" gradientFrom="purple.400" gradientTo="cyan.400" bgClip='text' fontSize="lg" fontWeight="semibold">Personalize with AI Prompts</Text>
        <Text fontSize="sm" color="fg.muted">Add an optional text prompt to change mood or theme, make your sticker truly unique.</Text>
        <Image borderRadius={4} my={4} alignSelf="center" w="full" src="https://placehold.co/380x250" alt="Telegram Integration" />
        <TryNowButton text="Customize Your Stickers" />
      </Flex>
      <Flex my={4} flexDirection="column" gap={4}>
        <Text bgGradient="to-r" gradientFrom="pink.400" gradientTo="orange.400" bgClip='text' fontSize="lg" fontWeight="semibold">Seamless Telegram Integration</Text>
        <Text fontSize="sm" color="fg.muted">If you use Telegram, your stickers are automatically compiled into a ready-to-use pack.</Text>
        <Image borderRadius={4} my={4} alignSelf="center" width={200} src={telegramIntegration} alt="Telegram Integration" />
        <TryNowButton />
      </Flex>
    </Flex>
  );
};

export default Features;