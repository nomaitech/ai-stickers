import { Button, Text, Box, Image } from '@chakra-ui/react'
import Section from './Section'
const Example = () => {
    return (
        <Section>
            <Button backgroundColor="orange.300" my={8} w="full" onClick={() => console.log("Generate Sticker")} size="xl" fontWeight="600" colorPalette="gray">
                <Text color="orange.800">Generate (-1 Credit)</Text>
            </Button>
            <Box borderStyle={"dotted"} borderColor={"orange.300"} h={"200px"} borderWidth={"2px"} borderRadius={"2xl"}>
                <Image />
            </Box>
        </Section>
    )
}

export default Example