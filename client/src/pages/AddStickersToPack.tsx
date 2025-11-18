import { Button, Center, Heading, Spinner, Text, Highlight } from "@chakra-ui/react";
import Section from "@/components/Section";
import StickerSelectorScroller from "@/components/StickerSelectorScroller";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListStickersFromPackQuery, useModifyStickerMutation } from "@/store/mainApi";
import type { Sticker } from "@/types";

const AddStickersToPack = () => {
    const { stickerPackId } = useParams();
    const { data, isLoading } = useListStickersFromPackQuery(stickerPackId ?? "");
    const [modifySticker] = useModifyStickerMutation();
    const [chosenStickers, setChosenStickers] = useState<Sticker[]>([])

    const addToStickerPack = async (chosenStickers: Sticker[]) => {
        for (let i = 0; i < chosenStickers.length; i++) {
            await modifySticker({ stickerId: chosenStickers[i].id, packId: stickerPackId });
        }
    }

    return (
        <Section>
            <Heading size="4xl">
                <Highlight query="Telegram Pack" styles={{ bgGradient: "to-r", gradientFrom: "purple.500", gradientVia: "pink.400", gradientTo: "orange.400", bgClip: 'text', fontWeight: "semibold" }}>
                    Add more stickers to your Telegram Pack
                </Highlight>
            </Heading>
            {isLoading ? (
                <Center>
                    <Spinner size="xl" color="orange.300" mt={2} />
                </Center>
            ) : (
                <>
                    <Text fontWeight="bold" fontSize="sm" my={4}>Select stickers to add to your pack</Text><Text>(Max 64 stickers)</Text>
                    {data && <StickerSelectorScroller stickers={data} onSelect={setChosenStickers} />}
                    <Button
                        backgroundColor="orange.300"
                        w="full"
                        size="xl"
                        mt={8}
                        mb={4}
                        variant="solid"
                        fontWeight="800"
                        colorPalette="gray"
                        color="orange.800"
                        _hover={{ textDecoration: "none", backgroundColor: "orange.400", color: "orange.950" }}
                        onClick={() => addToStickerPack(chosenStickers)}
                    >Add stickers to your pack</Button>
                </>
            )}
        </Section>
    )
}

export default AddStickersToPack;