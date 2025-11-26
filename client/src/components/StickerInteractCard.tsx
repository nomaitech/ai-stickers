import { Box, Image, Menu, Portal, Icon, Text } from "@chakra-ui/react"
import type { Sticker } from "@/types"
import { EllipsisVertical } from "lucide-react"
import { Download, Edit } from "lucide-react"
import { useState } from "react"
import EmojiSelector from "./EmojiSelector"
import { useModifyStickerMutation } from "@/store/mainApi"
type StickerInteractCardProps = {
    sticker: Sticker
}

const downloadFile = (url: string, filename?: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename ?? "file"; // suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const StickerInteractCard = ({ sticker }: StickerInteractCardProps) => {
    const [associatedEmoji, setAssociatedEmoji] = useState<string>(sticker.emoji)
    const [displayEmojiSelector, setDisplayEmojiSelector] = useState<boolean>(false)
    const [modifySticker] = useModifyStickerMutation();
    const handleMenuSelect = (value: string) => {
        switch (value) {
            case "download":
                downloadFile(sticker.generated_img_url, `createStickersOnline-${sticker.id}.png`)
                break;
            case "edit emoji":
                console.log("Yeah boy");
                setDisplayEmojiSelector(true);
                break;
            default:
                break;
        }
    }

    const changeEmoji = (newEmoji:string) =>{
        setAssociatedEmoji(newEmoji);
        setDisplayEmojiSelector(false);
        modifySticker({stickerId: sticker.id, emoji: newEmoji});
    }

    return (
        <Box borderRadius="2xl" borderWidth="1px" borderStyle="solid" borderColor="border/default" position="relative" overflow="hidden">
            <Image bg="gray.100" src={sticker.generated_img_url} alt={sticker.emoji} />
            <Menu.Root onSelect={(input) => handleMenuSelect(input.value)}>
                <Menu.Trigger asChild>
                    <Icon position="absolute" right={2} top={2} size="xl" color="gray.400">
                        <EllipsisVertical />
                    </Icon>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content w="150px">
                            <Menu.Item value="download"><Download />Download</Menu.Item>
                            <Menu.Item value="edit emoji"><Edit />Edit Emoji</Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
            <Text textAlign="center" my={2}>{associatedEmoji}</Text>
            <EmojiSelector open={displayEmojiSelector} setOpen={setDisplayEmojiSelector} emojiChangeHandler={changeEmoji}/>
        </Box>
    )
}

export default StickerInteractCard