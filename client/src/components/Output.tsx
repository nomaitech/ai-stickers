import { Button, Text, Box, Image, Flex } from '@chakra-ui/react'
import Section from './Section'
import { Line } from '@rc-component/progress';
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import DogCombo from '../assets/dogCombo.png'
type OutputProps = {
    enableButton: boolean
    stickerResult: string | null
    isLoading: boolean
    startGeneration: () => void
}

const Output = ({ enableButton, stickerResult, isLoading, startGeneration }: OutputProps) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const userInfo = useSelector((state: RootState) => state.ui.userInfo);

    useEffect(() => {
        if (isLoading) {
            const intervalId = setInterval(() => {
                setLoadingProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(intervalId);
                        return 100;
                    }
                    return prev + 0.2;
                });
            }, 200);
            return () => clearInterval(intervalId);
        } else {
            setLoadingProgress(0);
        }
    }, [isLoading]);

    return (
        <Section>
            <Button backgroundColor="orange.300" disabled={!enableButton} my={8} w="full" onClick={() => startGeneration()} size="xl" fontWeight="600" colorPalette="gray">
                <Text color="orange.800">{userInfo ? "Generate (-1 Credit)" : "Generate Sticker"}</Text>
            </Button>
            <Box
                borderStyle="dotted"
                position="relative"
                borderColor="orange.300"
                borderWidth="2px"
                borderRadius="2xl"
                minH="260px"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="white"
            >
                {isLoading ? (
                    <Flex flexDirection="column" alignItems="center" justifyContent="center" w="full" maxW="240px">
                        <Box w="150px">
                            <Line percent={loadingProgress} strokeWidth={4} strokeColor="#F6AD55" />
                        </Box>
                    </Flex>
                ) : stickerResult ? (
                    <Flex alignItems="center" justifyContent="center" w="full">
                        <Image src={stickerResult} objectFit="contain" maxH="100%" maxW="100%" />
                    </Flex>
                ) : (
                    <Flex w="full" alignItems="center" justifyContent="center">
                        <Image src={DogCombo} alt="Dog image turned into sticker" objectFit="contain" maxW="100%" />
                    </Flex>
                )}
            </Box>
        </Section>
    )
}

export default Output;
