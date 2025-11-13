import { Image } from "@chakra-ui/react";
import { useListStickersFromPackQuery } from "../store/mainApi";
import { Spinner, Flex, Text, Heading } from "@chakra-ui/react";
import EditableHeaderText from "@/components/EditableHeaderText";

type PackStickersProps = {
    parentPackId: string;
    parentPackName: string
}

const PackStickersDisplay = ({ parentPackId, parentPackName }: PackStickersProps) => {
    const { data: stickers, isLoading } = useListStickersFromPackQuery(parentPackId);

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
            <>
                {stickers.map((sticker) => (
                    <Image key={sticker.id} src={sticker.generated_img_url} />
                ))}
                <EditableHeaderText/>
            </>
        )
    ))
}

export default PackStickersDisplay;