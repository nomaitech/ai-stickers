import { Heading, Image, Flex } from '@chakra-ui/react';
import LandingSection from './LandingSection';
import TryNowButton from './TryNowButton';
import dogSticker from '../assets/dog-sticker.png';
const Proposal = () => {
    return(
        <LandingSection>
            <Flex flexDirection="column" align="center">
                <Heading size="4xl">Turn Your Photos Into</Heading>
                <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400"  bgClip='text' fontWeight="semibold">Personalized Stickers</Heading>
                <Image src={dogSticker} borderRadius="full" my={4}/>
                <TryNowButton />
            </Flex>
        </LandingSection>
    )
}

export default Proposal;