import { Flex, Text, Icon, Image, Box, Grid, Spinner } from "@chakra-ui/react"
import { ArrowRight, History as Clock } from "lucide-react"
import Section from "./Section"
import { useGetStickersQuery } from "@/store/mainApi";
import RouterButton from "./RouterButton";
const History = () => {
    const { data: stickers, isLoading } = useGetStickersQuery();
    return (
        <Section>
            <Flex justifyContent="space-between" mt={14} mb={5}>
                <Text color="text/fg" fontWeight="semibold" fontSize="xl">History</Text>
                <RouterButton color="gray.700" to="/my-stickers" bgColor={"white"} fontWeight="semibold" fontSize="sm">View All
                    <Icon>
                        <ArrowRight />
                    </Icon>
                </RouterButton>
            </Flex>
            {isLoading ? (
                <Flex w="full" h="200px" direction="column" align="center">
                    <Spinner size="md" color="orange.300" mt={2} />
                </Flex>
            ) : (stickers?.length == 0 ? (
                <Flex h={"162px"} bg={"gray.100"} direction={"column"} align={"center"} borderRadius={"2xl"}>
                    <Icon mt={6} w="32px" h="32px" color="orange.300">
                        <Clock />
                    </Icon>
                    <Text my={4} fontWeight="semibold">
                        No History yet
                    </Text>
                    <Text color="fg.muted">
                        Generated images will appear here
                    </Text>
                </Flex>
            ) : (
                <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    {stickers?.map(sticker => (
                        <Box key={sticker.id} bg="gray.50" borderRadius="xl" borderWidth="1px" borderStyle="solid" borderColor="gray.200" p={2}>
                            <Image src={sticker.generated_img_url} w="full" h="full" />
                        </Box>
                    ))}
                </Grid>
            )
            )}
        </Section>
    )
}

export default History;