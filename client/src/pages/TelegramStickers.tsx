import { Heading, Flex, Text, Center, Spinner, Box } from '@chakra-ui/react';
import PrimaryButton from '@/components/PrimaryButton';
import Section from '@/components/Section';
import { useListPacksQuery } from '@/store/mainApi';
import PackStickersDisplay from '@/components/PackStickersDisplay';

const TelegramStickers = () => {
    const { data: stickerPacks, isLoading } = useListPacksQuery();

    return (
        <Section>
            <Flex my={8} flexDirection="column" align="left">
                <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Telegram Sticker Packs</Heading>
                <Text mt={8} mb={12} fontSize="md" color="fg.muted">If you use Telegram, your stickers are automatically compiled into a ready-to-use pack.</Text>
                <PrimaryButton text="Create new sticker pack" to="/generate-sticker" />
            </Flex>
            {isLoading ? (
                <Center>
                    <Spinner size="md" color="orange.300" mt={2} />
                </Center>
            ) : (
                stickerPacks == undefined || stickerPacks?.length == 0 ? (
                    <Flex h={"162px"} bg={"gray.100"} mt={8} direction={"column"} align={"center"} borderRadius={"2xl"}>
                        <Text color="fg.muted">
                            Generated packs will appear here
                        </Text>
                    </Flex>
                ) : (
                    stickerPacks?.map(stickerPack => (
                        <Box w="full" key={stickerPack.id} borderRadius="2xl" borderWidth="1px" borderStyle="solid" borderColor="border/default" p={2} my={8}>
                            <PackStickersDisplay parentPackId={stickerPack.id} parentPackName={stickerPack.name}/>
                        </Box>
                    ))
                )
            )}
        </Section>
    )
}

export default TelegramStickers;