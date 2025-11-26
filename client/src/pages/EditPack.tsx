import Section from "@/components/Section";
import { Flex, Heading, Text, Button, Link, Grid, Spinner } from "@chakra-ui/react";
import { useListStickersFromPackQuery } from "@/store/mainApi";
import { useParams } from "react-router-dom";
import StickerInteractCard from "@/components/StickerInteractCard";
const EditPack = () => {
    const { stickerPackId } = useParams();
    const { data: stickers, isLoading } = useListStickersFromPackQuery(stickerPackId ?? "");

    return (
        <Section>
            <Flex my={8} flexDirection="column" align="left">
                <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">My Awesome Stickers</Heading>
                <Text mt={8} mb={12} fontSize="md" color="fg.muted">If you can read this, we forgot to put some copy here.</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                    <Button
                        asChild={true}
                        w="100%"
                        backgroundColor="orange.300"
                        size="xl"
                        variant="solid"
                        fontWeight="800"
                        colorPalette="gray"
                        color="orange.800"
                        _hover={{ textDecoration: "none", backgroundColor: "orange.400", color: "orange.950" }}
                    >
                        <Link href="/add-sticker">Add Stickers</Link>
                    </Button>
                    <Button
                        asChild={true}
                        w="100%"
                        size="xl"
                        variant="outline"
                        fontWeight="800"
                        colorPalette="gray"
                        color="orange.800"
                        borderColor="orange.300"
                        _hover={{ textDecoration: "none", backgroundColor: "orange.400", color: "orange.950" }}
                    >
                        <Link href="/add-sticker">Remove Stickers</Link>
                    </Button>
                </Grid>
            </Flex>
            {isLoading ? (
                <Spinner size="md" color="orange.300" mt={2} />
            ) : (
                <Grid templateColumns="repeat(2, 1fr)" columnGap={8} rowGap={4}>
                    {stickers?.map(sticker => (
                        <StickerInteractCard key={sticker.id} sticker={sticker} />
                    ))}
                </Grid>
            )}
        </Section>
    )
}

export default EditPack;