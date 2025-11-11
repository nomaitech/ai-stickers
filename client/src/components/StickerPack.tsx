import { Box, Editable, Text } from "@chakra-ui/react";


type StickerPackProps = {

}

const StickerPack = () => {
    return (
        <Box>

            <Editable.Root defaultValue="stickerpackname">
                <Editable.Preview />
                <Editable.Input />
            </Editable.Root>
            <Text>{stickers.length} Stickers</Text>
        </Box>
    )
}

export default StickerPack;