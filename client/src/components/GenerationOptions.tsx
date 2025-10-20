import { Accordion, Text, Badge, Flex, Textarea, Input } from "@chakra-ui/react"
import Section from "./Section"
import EmojiDrawer from "./EmojiDrawer"

type GenerationOptionsProps = {
    onEmojiChange: (emoji: string) => void;
    onPromptChange: (prompt: string) => void;
    emoji: string;
    prompt: string;
} 
const GenerationOptions = ({onEmojiChange, onPromptChange, emoji, prompt}: GenerationOptionsProps) => {

    return (
        <Section>
            <Accordion.Root collapsible multiple>
                <Accordion.Item value={"Emoji"}>
                    <Accordion.ItemTrigger display="flex" justifyContent="space-between" alignItems="center">
                        <Flex>
                            <Text color="text/fg" fontWeight="semibold" mr={2}>Emoji</Text>
                            <Badge colorScheme='gray' borderRadius="md" fontSize="xs">optional</Badge>
                        </Flex>
                        <Accordion.ItemIndicator color="black" />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <Input mb={2} placeholder="Select an emoji..." value={emoji} fontSize={"xl"}/>
                            <EmojiDrawer onSelect={(selection:string)=>{onEmojiChange(selection)}} />
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
                <Accordion.Item value={"Prompt"}>
                    <Accordion.ItemTrigger display="flex" justifyContent="space-between" alignItems="center">
                        <Flex>
                            <Text color="text/fg" fontWeight="semibold" mr={2}>Add a prompt</Text>
                            <Badge colorScheme='gray' borderRadius="md" fontSize="xs">optional</Badge>
                        </Flex>
                        <Accordion.ItemIndicator color="black" />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <Textarea placeholder="Add instructions to personalize your sticker." value={prompt} onChange={(e) => onPromptChange(e.target.value)} h="100px" color="fd/subtle" size="md" />
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </Section>
    )
}

export default GenerationOptions