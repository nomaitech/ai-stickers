import { Button, Center, Heading, Spinner, Text } from "@chakra-ui/react";
import Section from "@/components/Section";
import StickerSelectorScroller from "@/components/StickerSelectorScroller";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListStickersFromPackQuery } from "@/store/mainApi";
import type { Sticker } from "@/types";

const AddStickersToPack = () => {
    const { stickerPackId } = useParams();
    const { data,  isLoading } = useListStickersFromPackQuery(stickerPackId ?? "");
    const [chosenStickers, setChosenStickers] = useState<Sticker[]>([])

    const removeFromStickerPack = (chosenStickers: Sticker[]) => {
        console.log(chosenStickers);
    }
    return (
        <Section>
            <Heading size="4xl">Create your</Heading>
            <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Telegram Pack</Heading>
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

export default AddStickersToPack;