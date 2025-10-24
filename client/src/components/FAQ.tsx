import { Accordion, Flex, Span, Text } from "@chakra-ui/react"
import Section from "./Section"
const items = [
  {
    value: "b",
    title: "Is this a question?",
    text: "This is the answer to the question.",
  },
  {
    value: "b2",
    title: "Is this a question?",
    text: "This is the answer to the question.",
  },
  {
    value: "b3",
    title: "Is this a question?",
    text: "This is the answer to the question.",
  },
  {
    value: "b4",
    title: "Is this a question?",
    text: "This is the answer to the question.",
  },
];

const FAQ = () => {
  return (
    <Section>
      <Flex w="full" flexDirection="column">
        <Text m={8} fontSize="3xl" fontWeight="semibold" textAlign="center">FAQ</Text>
        <Accordion.Root variant={"enclosed"} size={"lg"} collapsible defaultValue={["b"]}>
          {items.map((item, index) => (
            <Accordion.Item key={index} value={item.value}>
              <Accordion.ItemTrigger>
                <Span flex="1">{item.title}</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Flex>
    </Section>
  );
};

export default FAQ;