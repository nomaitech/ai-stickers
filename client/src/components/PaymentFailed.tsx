import { EmptyState, Flex, Icon, Text, Box, Button } from "@chakra-ui/react"
import { X } from "lucide-react";

const PaymentFailed = () => {
    return (
        <Box h="100vh" bgGradient="to-t" gradientFrom="red.100" gradientTo="white">
            <EmptyState.Root>
                <EmptyState.Content>
                        <Flex direction="column" align="center">
                            <Flex bgColor="red.100" h={16} w={16} borderRadius={"full"} align="center" justify="center">
                                <Icon h={12} w={12} color="fg.error">
                                    <X />
                                </Icon>
                            </Flex>
                            <EmptyState.Title fontSize="xl" color="fg.error" my={3}>Payment Failed</EmptyState.Title>
                            <EmptyState.Description fontSize="md" color="black" textAlign="center" my={5} >
                                <Text>Something went wrong</Text>
                                <Text fontSize="sm" color="fg.muted" mt={5}>Please try again using a different payment method, or contact us by email.</Text>
                                <Button m={6} variant="outline" fontWeight="bold" _hover={{ bg: "red.100" }}>Contact us</Button>
                            </EmptyState.Description>
                        </Flex>
                </EmptyState.Content>
            </EmptyState.Root>
        </Box>
    )
}

export default PaymentFailed;