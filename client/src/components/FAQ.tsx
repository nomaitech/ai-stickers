import { Accordion, Flex, Span, Text } from "@chakra-ui/react"
import Section from "./Section"
const items = [
  {
    value: "b",
    title: "How many free stickers do I get?",
    text: "Every new user receives 2 free credits to try the service. Each credit generates one custom sticker. After that, you can purchase additional credits at affordable prices.",
  },
  {
    value: "b2",
    title: "How does the AI sticker generation work?",
    text: "Upload any photo, and our AI analyzes it to create a professional Telegram-style sticker with a transparent background. You can also add custom instructions to modify the style, mood, or add creative effects to make your sticker unique.",
  },
  {
    value: "b3",
    title: "Can I create and share Telegram sticker packs?",
    text: "Yes! After generating stickers, you can organize them into custom Telegram sticker packs. Each pack gets a unique link you can share with friends. You can add, remove, update emojis, and manage your packs anytime from your dashboard.",
  },
  {
    value: "b4",
    title: "What happens to my generated stickers?",
    text: "All your stickers are saved to your account and accessible in the 'My Stickers' section. You can choose to keep them private or share them publicly in the community Explore gallery. You can download, delete, or add them to sticker packs at any time.",
  },
  {
    value: "b5",
    title: "How much does it cost?",
    text: "The service uses a simple credit system. Each sticker generation costs 1 credit. We offer various credit packages at affordable prices. Start with 2 free credits to test the quality, then choose a package that fits your needs.",
  },
  {
    value: "b6",
    title: "What image formats are supported?",
    text: "You can upload photos in common formats like JPG, PNG, and more. Our AI processes your image and outputs a high-quality PNG sticker with a transparent background, perfectly sized for Telegram at 512x512 pixels.",
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