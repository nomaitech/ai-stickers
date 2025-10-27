import { EmptyState, ProgressCircle, AbsoluteCenter, Flex, Box } from "@chakra-ui/react"
import { useState, useEffect } from "react";
const ProcessingPayemnt = () => {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prev) => Math.min(prev + 0.3, 100))
        }, 100);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <Box h="100vh" bgGradient="to-t" gradientFrom="orange.100" gradientTo="white">
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                    </EmptyState.Indicator>
                    <AbsoluteCenter textAlign="center" w="full">
                        <Flex direction="column" align="center">
                            <ProgressCircle.Root size="lg" value={progress} colorPalette="orange" my={2}>
                                <ProgressCircle.Circle>
                                    <ProgressCircle.Track />
                                    <ProgressCircle.Range strokeLinecap="round" />
                                </ProgressCircle.Circle>
                            </ProgressCircle.Root>
                            <EmptyState.Title fontSize="xl" color="orange.600" my={3}>We are processing your payment</EmptyState.Title>
                            <EmptyState.Description fontSize="md" color="black" my={5}>
                                Please do not refresh or press the back button.
                            </EmptyState.Description>
                        </Flex>
                    </AbsoluteCenter>
                </EmptyState.Content>
            </EmptyState.Root>
        </Box >
    )
}

export default ProcessingPayemnt;