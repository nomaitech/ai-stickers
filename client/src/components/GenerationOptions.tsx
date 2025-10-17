import { Accordion, Text, Badge, Flex, Textarea, Input } from "@chakra-ui/react"
import Section from "./Section"
import EmojiDrawer from "./EmojiDrawer"
const GenerationOptions = () => {

    return (
        <Section>
            <Accordion.Root collapsible multiple px={2}>
                <Accordion.Item value={"Emoji"}>
                    <Accordion.ItemTrigger display="flex" justifyContent="space-between" alignItems="center" px={4}>
                        <Flex>
                            <Text color="text/fg" fontWeight="semibold" mr={2}>Emoji</Text>
                            <Badge colorScheme='gray' borderRadius="md" fontSize="xs">optional</Badge>
                        </Flex>
                        <Accordion.ItemIndicator color="black" />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <Input placeholder="Select an emoji..." fontSize={"xl"} pl={5} ml={2}/>
                            <EmojiDrawer />
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
                <Accordion.Item value={"Prompt"}>
                    <Accordion.ItemTrigger display="flex" justifyContent="space-between" alignItems="center" px={4}>
                        <Flex>
                            <Text color="text/fg" fontWeight="semibold" mr={2}>Add a prompt</Text>
                            <Badge colorScheme='gray' borderRadius="md" fontSize="xs">optional</Badge>
                        </Flex>
                        <Accordion.ItemIndicator color="black" />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <Textarea placeholder="Add instructions to personalize your sticker." h="100px" color="fd/subtle" size="md" />
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </Section>
    )
}

export default GenerationOptions