import { Heading, Image, Flex, Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Section from './Section';
import TryNowButton from './TryNowButton';
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
                <Heading size="4xl">Turn Your Photos Into</Heading>
                <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Personalized Stickers</Heading>
                <Text mt={8} mb={12} fontSize="xl">Upload a photo and let AI turn it into a sticker pack ready for chat apps, memes, or merch.</Text>
                <Box mt={8} bgImage="radial-gradient(circle, #FBCFE8 0%, white 60%)">
                    <Image src={images[imageIndex]} borderRadius="full" my={4} />
                </Box>
                <TryNowButton text="Try for free" />
            </Flex>
        </Section>
    )
}

export default Proposal;