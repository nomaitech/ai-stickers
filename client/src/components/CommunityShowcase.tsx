import { Flex, Text, Heading } from '@chakra-ui/react';
import Section from './Section';
import PrimaryButton from './PrimaryButton';

const CommunityShowcase = () => {
    return (
        <Section>
            <Flex flexDirection="column" align="center" textAlign="center" gap={6}>
                <Heading size="3xl" fontWeight="semibold">
                    Join Our Creative Community
                </Heading>
                <Text fontSize="xl" color="fg.muted" maxW="2xl">
                    Get inspired by thousands of unique stickers created by our community. Explore trending designs, discover creative styles, and see what's possible with AI-powered sticker generation.
                </Text>
                <PrimaryButton text="Discover Community Stickers" to="/explore" maxW="md" />
            </Flex>
        </Section>
    );
};

export default CommunityShowcase;
