import { Heading, Flex, Text } from '@chakra-ui/react';
import Section from './Section';
const GeneratorHeader = () => {
    return (
        <Section>
            <Flex my={8} mx={2} flexDirection="column" align="left">
                <Heading size="4xl">Generate Your</Heading>
                <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Personalized Stickers</Heading>
                <Text mt={8} mb={12} fontSize="xl" color="fg.muted">Upload any photo to generate a sticker ready to use in chat apps, memes, or merch.</Text>
            </Flex>
        </Section>
    )
}

export default GeneratorHeader;