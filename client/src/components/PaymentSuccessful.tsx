import { EmptyState, AbsoluteCenter, Flex, Icon, Text, Box } from "@chakra-ui/react"
import { Check } from "lucide-react";

const PaymentSuccessful = () => {
    return (
        <Box h="100vh" bgGradient="to-t" gradientFrom="green.100" gradientTo="white">
            <EmptyState.Root>
                <EmptyState.Content>
                    <AbsoluteCenter textAlign="center" w="full">
                        <Flex direction="column" align="center">
                            <Flex bgColor="green.100" h={16} w={16} borderRadius={"full"} align="center" justify="center">
                                <Icon h={12} w={12} color="fg.success">
                                    <Check />
                                </Icon>
                            </Flex>
                            <EmptyState.Title fontSize="xl" color="fg.success" my={3}>Payment Successful!</EmptyState.Title>
                            <EmptyState.Description fontSize="md" color="black" my={5}>
                                <Text>Your payment has been processed.</Text>
                                <Text fontSize="sm" color="fg.muted" mt={5}>You will receive a confirmation email shortly.</Text>
                                <Text fontSize="sm" color="fg.muted">Please wait while we redirect you...</Text>
                            </EmptyState.Description>
                        </Flex>
                    </AbsoluteCenter>
                </EmptyState.Content>
            </EmptyState.Root>
        </Box>
    )
}

export default PaymentSuccessful;