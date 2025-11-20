import { Button, Center, Heading, Spinner, Text, Highlight } from "@chakra-ui/react";
import Section from "@/components/Section";
import StickerSelectorScroller from "@/components/StickerSelectorScroller";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListStickersFromPackQuery, useModifyStickerMutation } from "@/store/mainApi";
import type { Sticker } from "@/types";

const RemoveStickersFromPack = () => {
    const { stickerPackId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useListStickersFromPackQuery(stickerPackId ?? "");
    const [modifySticker] = useModifyStickerMutation();
    const [chosenStickers, setChosenStickers] = useState<Sticker[]>([])

    const removeFromStickerPack = async (chosenStickers: Sticker[]) => {
        for (let i = 0; i < chosenStickers.length; i++) {
            await modifySticker({ stickerId: chosenStickers[i].id, packId: null });
        }
        navigate(`/edit-stickerpack/${stickerPackId}`);
    }
    
    return (
        <Section>
            <Heading size="4xl">
                <Highlight query="Telegram Pack" styles={{ bgGradient: "to-r", gradientFrom: "purple.500", gradientVia: "pink.400", gradientTo: "orange.400", bgClip: 'text', fontWeight: "semibold" }}>
                    Remove stickers from your Telegram Pack
                </Highlight>
            </Heading>
            {isLoading ? (
                <Center>
                    <Spinner size="xl" color="orange.300" mt={2} />
                </Center>
            ) : (
                <>
                    <Text fontWeight="bold" fontSize="sm" my={4}>Select stickers to remove from your pack</Text>
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
                        onClick={() => removeFromStickerPack(chosenStickers)}
                    >Remove stickers to your pack</Button>
                </>
            )}
        </Section>
    )
}

export default RemoveStickersFromPack;