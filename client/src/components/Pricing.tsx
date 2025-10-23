import { Box, Text, List, Flex, Button, Separator, Icon } from '@chakra-ui/react'
import { Check } from 'lucide-react';

type PricingProps = {
    name: string
    price: number
    stickerAmount: number
};
const Pricing = ({ name, price, stickerAmount }: PricingProps) => {

    return (
        <Box w={{ md: "379px" }} h="352px" mb={12} bg="white" borderRadius="2xl" borderWidth="1px" borderStyle="solid" borderColor="gray.200" p={6}>
            <Text mt={2} bgGradient="to-r" gradientFrom="orange.400" gradientTo="yellow.400" bgClip='text' fontWeight="semibold">{name}</Text>
            <Flex direction="row" align="baseline" mt={2}>
                <Text fontSize="4xl" fontWeight="bold" mr={2}>${price}</Text>
                <Text color="fg.muted">one time payment</Text>
            </Flex>
            <Separator my={6} variant="dashed" />
            <List.Root gap="2" variant="plain" align="center">
                <List.Item>
                    <List.Indicator asChild color="orange.300">
                        <Icon w={8} h={8}>
                            <Check />
                        </Icon>
                    </List.Indicator>
                    <Flex direction="row">
                        <Text mr={1} fontWeight="semibold">{stickerAmount}</Text>
                        <Text fontWeight="semibold">sticker credits</Text>
                    </Flex>
                </List.Item>
                <List.Item>
                    <List.Indicator asChild color="orange.300">
                        <Icon w={8} h={8}>
                            <Check />
                        </Icon>
                    </List.Indicator>
                    <Flex direction="row">
                        <Text mr={1} fontWeight="semibold">${(price / stickerAmount).toFixed(2)}</Text>
                        <Text fontWeight="semibold">per sticker</Text>
                    </Flex>
                </List.Item>
            </List.Root>
            <Button backgroundColor="orange.300" onClick={() => console.log("Whoa")} w="full" size="xl" mt={6} variant="solid" fontWeight="800" colorPalette="gray">
                <Text color="orange.800">Add Credits</Text>
            </Button>
        </Box>
    )
}

export default Pricing;