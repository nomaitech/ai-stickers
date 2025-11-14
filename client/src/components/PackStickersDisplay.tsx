import { Image, Grid, GridItem } from "@chakra-ui/react";
import { useListStickersFromPackQuery } from "../store/mainApi";
import { Spinner, Flex, Text, Box } from "@chakra-ui/react";
import EditableHeaderText from "@/components/EditableHeaderText";
import { useNavigate } from "react-router-dom";

type PackStickersProps = {
    parentPackId: string;
    parentPackName: string
}

const PackStickersDisplay = ({ parentPackId, parentPackName }: PackStickersProps) => {
    let { data: stickers, isLoading } = useListStickersFromPackQuery(parentPackId);
    const navigate = useNavigate();
    let rows = 2;
    let cols = 4;
    let columnGap = null;
    if (stickers) {
        if (stickers.length <= 3) {
            rows = 1;
            cols = 2;
        } else if (stickers.length <= 6) {
            rows = 2;
            cols = 3;
            columnGap = 6;
        } else {
            rows = 2;
            cols = 4;
        }
        if (stickers.length > rows*cols) {
            stickers = stickers.slice(0, rows*cols);
        }
    }

    return (isLoading ? (
        <Spinner size="md" color="orange.300" mt={2} />
    ) : (
        stickers == undefined || stickers?.length == 0 ? (
            <Flex h={"162px"} bg={"gray.100"} mt={8} direction={"column"} align={"center"} borderRadius={"2xl"}>
                <Text color="fg.muted">
                    Generated images will appear here
                </Text>
            </Flex>
        ) : (
            <Box mt={2} mb={4} mx={4}>
                <Grid templateRows={`repeat(${rows}, 1fr)`} templateColumns={`repeat(${cols}, 1fr)`} gap={columnGap || 4} mx={2} _hover={{ cursor: "pointer"}}
                onClick={()=> navigate(`/edit-stickerpack/${parentPackId}`)}>
                    {stickers.map((sticker) => (
                        <GridItem key={sticker.id} borderRadius={8} bg="gray.100">
                            <Image src={sticker.generated_img_url} />
                        </GridItem>
                    ))}
                    {stickers.length < rows * cols && (
                        <GridItem
                            borderRadius={8}
                            bg="gray.100"
                        />
                    )}
                </Grid>
                <EditableHeaderText packName={parentPackName} packId={parentPackId} />
                <Text mx={1} fontSize="sm" color="fg.muted">{stickers.length} Stickers</Text>
            </Box>
        )
    ))
}

export default PackStickersDisplay;