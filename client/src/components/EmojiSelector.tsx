import { Input, Listbox, Square, createGridCollection, useFilter, useListboxContext, Dialog } from "@chakra-ui/react"
import emojibase from "emojibase-data/en/compact.json";
import { useCallback, useMemo, useState } from "react"
import { LuSmile } from "react-icons/lu"

type Emoji = (typeof emojibase)[number]
const emojis = emojibase
    .filter((e) => !e.label.startsWith("regional indicator"))
    .slice(0, 200) as Emoji[]

type SelectedEmojiProps = {
    emojiChangeHandler: (emoji: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}

const SelectedEmoji = () => {
    const listbox = useListboxContext()
const selected = listbox.selectedItems as Emoji[] | undefined;
const item = selected?.[0];
    // emojiChangeHandler(item.unicode);
    return (
        <Square size="40px" bg="bg.muted" rounded="sm" textStyle="lg">
            {item ? item.unicode : <LuSmile />}
        </Square>
    )
}

const EmojiSelector = ({ emojiChangeHandler, open, setOpen }: SelectedEmojiProps ) => {
    const { contains } = useFilter({ sensitivity: "base" })
    const [items, setItems] = useState(emojis)
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
                <Dialog.Content maxW="412px" height="682px">
                    <Dialog.Body p={0}>
                        <Listbox.Root collection={collection} maxW="min-content">
                            <SelectedEmoji />
                            <Listbox.Input
                                as={Input}
                                placeholder="Type to filter frameworks..."
                                onChange={(e) => filter(e.target.value)}
                            />
                            <Listbox.Content
                                w="374px"
                                display="grid"
                                gridTemplateColumns="repeat(8, 1fr)"
                                gap="1"
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
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}



export default EmojiSelector