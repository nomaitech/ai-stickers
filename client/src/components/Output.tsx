import { Button, Text, Box, Image, AbsoluteCenter } from '@chakra-ui/react'
import { LoaderCircle } from 'lucide-react'
import Section from './Section'
import { Line } from '@rc-component/progress';
import { useState, useEffect } from 'react'

type OutputProps = {
    enableButton: boolean
    stickerResult: string | null
    isLoading: boolean
    startGeneration: () => void
}
const Output = ({ enableButton, stickerResult, isLoading, startGeneration }: OutputProps) => {
    const [loadingProgress, setLoadingProgress] = useState(0);

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
                <Text color="orange.800">Generate (-1 Credit)</Text>
            </Button>
            <Box borderStyle={"dotted"} borderColor={"orange.300"} h={"200px"} borderWidth={"2px"} borderRadius={"2xl"} overflow={"hidden"}>
                {isLoading ? (
                    <AbsoluteCenter>
                        <Line percent={loadingProgress} />
                        <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
                    </AbsoluteCenter>
                ) : stickerResult ? (
                    <Image src={stickerResult} />
                ) : (
                    <p>Placeholder</p>
                )}
            </Box>
        </Section>
    )
}

export default Output;