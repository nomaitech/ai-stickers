import { Heading, Flex, Text } from '@chakra-ui/react';
import Section from '@/components/Section';
import Pricing from '@/components/Pricing';
import useTopUp from '@/hooks/useTopUp';

const Billing = () => {
    const getTopUpLink = useTopUp();

    return (
        <>
            <Section>
                <Flex my={8} flexDirection="row" align="center">
                    <Heading size="4xl" mr={2}>Get more </Heading>
                    <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Credits</Heading>
                </Flex>
                <Text color="fg.muted">Choose the best plan for you, with no commitments - COPY WIP</Text>
            </Section>
            <Section>
                <Pricing onClick={getTopUpLink} name="Standard" price={10} stickerAmount={40} highlighted/>
                <Pricing onClick={getTopUpLink} name="Basic" price={5} stickerAmount={15} />
                <Pricing onClick={getTopUpLink} name="Premium" price={15} stickerAmount={100} />
            </Section>
        </>
    )
}


export default Billing;