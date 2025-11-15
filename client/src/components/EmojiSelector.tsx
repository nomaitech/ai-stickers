import { Input, Listbox, Square, createGridCollection, useFilter, useListboxContext, Dialog, Button, Box, Heading } from "@chakra-ui/react"
import emojibase from "emojibase-data/en/compact.json";
import { useCallback, useMemo, useState } from "react"
import { LuSmile } from "react-icons/lu"

type Emoji = (typeof emojibase)[number]
const emojis = emojibase
    .filter((e) => !e.label.startsWith("regional indicator"))
    .slice(0, 200) as Emoji[]

type EmojiSelectorProps = {
    emojiChangeHandler: (emoji: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}

type SelectedEmojiProps = {
    emojiStateSetter: (emoji: string) => void
}

const EmojiSelector = ({ emojiChangeHandler, open, setOpen }: EmojiSelectorProps) => {
    const { contains } = useFilter({ sensitivity: "base" })
    const [items, setItems] = useState(emojis)
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");

    const SelectedEmoji = ({ emojiStateSetter }: SelectedEmojiProps) => {
        const listbox = useListboxContext()
        const selected = listbox.selectedItems as Emoji[] | undefined;
        const item = selected?.[0];
        emojiStateSetter(item?.unicode || "");
        return (
            <Square size="40px" bg="bg.muted" rounded="sm" textStyle="lg">
                {item ? item.unicode : <LuSmile />}
            </Square>
        )
    }

    const collection = useMemo(() =>
        createGridCollection({
            columnCount: 8,
            items: items,
            itemToString(item) {
                return `${item.label} (${item.shortcodes})`
            },
            itemToValue(item) {
                return item.hexcode
            },
        }),
        [items],
    )

    const filter = useCallback(
        (value: string) => {
            setItems(emojis.filter((e) => contains(e.label, value)))
        },
        [contains],
    )

    return (
        <Dialog.Root placement="center" open={open} onOpenChange={(details) => setOpen(details.open)}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content maxW="412px" height="fit-content">
                    <Dialog.Body p={8}>
                        <Heading>Edit the emoji related to the sticker</Heading>
                        <Listbox.Root collection={collection} maxW="min-content">
                            <SelectedEmoji emojiStateSetter={setSelectedEmoji}/>
                            <Listbox.Input
                                as={Input}
                                placeholder="Type to filter frameworks..."
                                onChange={(e) => filter(e.target.value)}
                            />
                            <Listbox.Content
                                w="100%"
                                display="grid"
                                gridTemplateColumns="repeat(8, 1fr)"
                                gap="0.5"
                            >
                                {collection.items.map((item, index) => (
                                    <Listbox.Item
                                        item={item}
                                        key={index}
                                        css={{
                                            width: "40px",
                                            height: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "md",
                                            fontSize: "22px",
                                        }}
                                    >
                                        {item.unicode}
                                    </Listbox.Item>
                                ))}
                            </Listbox.Content>
                        </Listbox.Root>
                        <Box mt={4} display="flex" justifyContent="flex-end" gap={4}>
                            <Button
                                size="xl"
                                variant="outline"
                                fontWeight="800"
                                colorPalette="gray"
                                color="gray.800"
                                borderColor="gray.300"
                                _hover={{ textDecoration: "none", backgroundColor: "gray.400", color: "gray.950" }}
                                onClick={() => setOpen(false)}
                            >Cancel</Button>
                            <Button
                                backgroundColor="orange.300"
                                size="xl"
                                variant="solid"
                                fontWeight="800"
                                colorPalette="gray"
                                color="orange.800"
                                _hover={{ textDecoration: "none", backgroundColor: "orange.400", color: "orange.950" }}
                                onClick={() => { emojiChangeHandler(selectedEmoji) }}
                            >Save</Button>
                        </Box>
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}



export default EmojiSelector