import { Accordion, Text, Badge, Flex, Textarea } from "@chakra-ui/react"
import Section from "./Section"

type GenerationOptionsProps = {
    onPromptChange: (prompt: string) => void;
    prompt: string;
} 
const GenerationOptions = ({onPromptChange, prompt}: GenerationOptionsProps) => {

    return (
        <Section>
            <Accordion.Root collapsible multiple>
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