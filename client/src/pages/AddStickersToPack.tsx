import { Button, Center, Heading, Spinner, Text, Highlight } from "@chakra-ui/react";
import Section from "@/components/Section";
import StickerSelectorScroller from "@/components/StickerSelectorScroller";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useModifyStickerMutation, useGetStickersQuery } from "@/store/mainApi";
import type { Sticker } from "@/types";

const AddStickersToPack = () => {
    const { stickerPackId } = useParams();
    const navigate = useNavigate();
    const { data: allStickers, isLoading } = useGetStickersQuery();
    const nonPackedStickers = allStickers ? allStickers.filter(s => s.sticker_pack_id == null) : [];

    const [modifySticker] = useModifyStickerMutation();
    const [chosenStickers, setChosenStickers] = useState<Sticker[]>([])

    const addToStickerPack = async (chosenStickers: Sticker[]) => {
        for (let i = 0; i < chosenStickers.length; i++) {
            await modifySticker({ stickerId: chosenStickers[i].id, packId: stickerPackId });
        }
        navigate(`/edit-stickerpack/${stickerPackId}`);
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
                    <Text fontWeight="bold" fontSize="sm" my={4}>
                        <Highlight query={["(Max", "64", "stickers)"]} styles={{ color: "fg.muted" }}>
                            Select stickers to add to your pack (Max 64 stickers)
                        </Highlight>
                    </Text>
                    {nonPackedStickers && <StickerSelectorScroller stickers={nonPackedStickers} onSelect={setChosenStickers} />}
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