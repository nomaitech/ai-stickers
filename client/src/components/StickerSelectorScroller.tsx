import { Listbox, createListCollection, Grid, Image, useListboxContext } from "@chakra-ui/react";
import { useEffect } from "react";
import type { Sticker } from "@/types"

type StickerSelectorScrollerProps = {
    stickers: Sticker[]
    onSelect: (items: Sticker[]) => void
}

type InternalSelectionBridgeProps = {
    onSelect: (items: Sticker[]) => void
}

const StickerSelectorScroller = ({ stickers, onSelect }: StickerSelectorScrollerProps) => {

    const stickerListCollection = createListCollection({
        items: stickers,
        itemToValue: (item) => item.generated_img_url
    });


    const InternalSelectionBridge = ({ onSelect }: InternalSelectionBridgeProps) => {
        const listbox = useListboxContext();
        const selected = listbox.selectedItems;
        useEffect(() => {
            onSelect(selected);
        }, [selected]);

        return null;
    };


    return (
        <Listbox.Root
            selectionMode="multiple"
            collection={stickerListCollection}
            orientation="vertical"
            maxW="640px"
        >
            <InternalSelectionBridge onSelect={onSelect} />
            <Listbox.Content>
                <Grid templateColumns="repeat(3, 1fr)">
                    {stickerListCollection.items.map((sticker) => (
                        <Listbox.Item
                            item={sticker}
                            key={sticker.generated_img_url}
                            flexDirection="column"
                            alignItems="flex-start"
                            gap="2"
                            position="relative"
                        >
                            <Image src={sticker.generated_img_url} />
                            <Listbox.ItemIndicator
                                position="absolute"
                                top="4"
                                right="4"
                                layerStyle="fill.solid"
                                borderWidth="2px"
                                borderColor="fg.inverted"
                            />
                        </Listbox.Item>
                    ))}
                </Grid>
            </Listbox.Content>
        </Listbox.Root>
    )
}

export default StickerSelectorScroller;