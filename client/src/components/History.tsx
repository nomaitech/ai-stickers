import { Flex, Text, Icon, Button } from "@chakra-ui/react"
import { ArrowRight, History as Clock } from "lucide-react"
import Section from "./Section"
const History = () => {

    return (
        <Section>
            <Flex justifyContent="space-between" mt={14} mb={5}>
                <Text color="text/fg" fontWeight="semibold" fontSize="xl">History</Text>
                <Button color="gray.700" bgColor={"white"} fontWeight="semibold" fontSize="sm">View All
                    <Icon>
                        <ArrowRight />
                    </Icon>
                </Button>
            </Flex>
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
        </Section>
    )
}

export default History;