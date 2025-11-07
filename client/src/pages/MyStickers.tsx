import Section from "@/components/Section";
import { Flex, Heading, Grid, Box, Text, Image, Spinner, AbsoluteCenter } from "@chakra-ui/react";
import { useGetStickersQuery } from "@/store/mainApi";
import PrimaryButton from "@/components/PrimaryButton";
const MyStickers = () => {
    const { data: stickers, isLoading } = useGetStickersQuery();

    return (
        <Section>
            <Flex my={8} flexDirection="row" align="left">
                <Heading size="4xl" mr={2}>My
                    <Text as="span" fontSize="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold"> Stickers</Text>
                </Heading>
            </Flex>
            {stickers?.length == 0 ? (
                <PrimaryButton to="/generate-sticker" text="Generate your first sticker" />
            ) : (
                <PrimaryButton to="/generate-sticker" text="Generate more stickers" />
            )}
            {isLoading ? (
                <AbsoluteCenter>
                    <Spinner size="md" color="orange.300" mt={2} />
                </AbsoluteCenter>
            ) : (
                stickers?.length == 0 ? (
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

export default MyStickers;