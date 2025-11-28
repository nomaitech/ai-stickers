import { Heading, Image, Flex, Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Section from './Section';
import PrimaryButton from './PrimaryButton';
import dogSticker from '../assets/dog-sticker.png';
import secondSticker from '@/assets/gallery/gallery1.png';
import thirdSticker from '@/assets/gallery/gallery6.png';

const images = [dogSticker, secondSticker, thirdSticker];

const Proposal = () => {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((i) => (i + 1) % images.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Section>
            <Flex my={8} flexDirection="column" align="left">
                <Heading size="4xl">Create Custom Telegram</Heading>
                <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Stickers in Seconds</Heading>
                <Text mt={8} mb={12} fontSize="xl">Transform any photo into professional Telegram stickers with AI. Upload, customize, and share your unique sticker packs instantly.</Text>
                <Box mt={8} bgImage="radial-gradient(circle, #FBCFE8 0%, white 60%)">
                    <Image src={images[imageIndex]} borderRadius="full" my={4} />
                </Box>
                <PrimaryButton text="Get 2 Free Stickers" to="/generate-sticker" />
            </Flex>
        </Section>
    )
}

export default Proposal;