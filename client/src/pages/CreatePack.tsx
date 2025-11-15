import { Heading, Field, Input, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import Section from "@/components/Section";
import StickerSelectorScroller from "@/components/StickerSelectorScroller";
import { useGetStickersQuery, useCreatePackMutation } from "@/store/mainApi";
import type { Sticker } from "@/types";

const CreatePack = () => {
    const { data, isLoading } = useGetStickersQuery();
    const [createPack] = useCreatePackMutation();
    const [chosenStickers, setChosenStickers] = useState<Sticker[]>([])
    const [name, setName] = useState("");

    const createStickerPack = (name:string, stickersArray:Sticker[]) => {
        createPack({
            name,
            stickerIds: stickersArray.map((sticker) => sticker.id)
        })
    }

    return (
        <Section>
            <Heading size="4xl">Create your</Heading>
            <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Telegram Pack</Heading>
            <Field.Root required>
                <Field.Label>
                    Sticker pack title <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Type the name of your sticker pack" />
            </Field.Root>
            <Text fontWeight="bold" fontSize="sm" my={4}>Select stickers to add to your pack (min 1 sticker)</Text>
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
                onClick={() => createStickerPack(name, chosenStickers)}
            >Create sticker pack</Button>
        </Section>
    )
}

export default CreatePack;