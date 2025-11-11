import { Heading, Flex, Text, Center, Spinner, Grid, Box, Image } from '@chakra-ui/react';
import PrimaryButton from '@/components/PrimaryButton';
import Section from '@/components/Section';
import { useListPacksQuery } from '@/store/mainApi';

const TelegramStickers = () => {
    const { data: pack, isLoading } = useListPacksQuery();

    return (
        <Section>
            <Flex my={8} flexDirection="column" align="left">
                <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Telegram Sticker Packs</Heading>
                <Text mt={8} mb={12} fontSize="xl">If you use Telegram, your stickers are automatically compiled into a ready-to-use pack.</Text>
                <PrimaryButton text="Create new sticker pack" to="/generate-sticker" />
            </Flex>
            {pack?.length == 0 ? (
                <PrimaryButton text="Generate your first sticker" />
            ) : (
                <PrimaryButton text="Generate more stickers" />
            )}
            {isLoading ? (
                <Center>
                    <Spinner size="md" color="orange.300" mt={2} />
                </Center>
            ) : (
                pack?.length == 0 ? (
                    <Flex h={"162px"} bg={"gray.100"} mt={8} direction={"column"} align={"center"} borderRadius={"2xl"}>
                        <Text color="fg.muted">
                            Generated images will appear here
                        </Text>
                    </Flex>
                ) : (
                    <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={8}>
                        {stickers?.map(sticker => (
                            <Box key={sticker.id} bg="gray.50" borderRadius="xl" borderWidth="1px" borderStyle="solid" borderColor="gray.200" p={2}>
                                <Image src={sticker.generated_img_url} w="full" h="full" />
                            </Box>
                        ))}
                    </Grid>
                )
            )}
        </Section>
    )
}

export default TelegramStickers;