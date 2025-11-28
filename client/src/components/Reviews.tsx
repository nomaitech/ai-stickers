import { Avatar, Flex, VStack, Text, Card } from "@chakra-ui/react";
import Section from "./Section";
const users = [
  {
    name: "Sarah Martinez",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    review: "I made stickers of my cat in minutes! The AI quality is incredible and the transparent backgrounds are perfect. My friends love the sticker pack I shared on Telegram.",
  },
  {
    name: "Alex Chen",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    review: "Super easy to use and the custom prompts feature is genius. I turned my team photos into hilarious stickers for our group chat. Worth every credit!",
  },
  {
    name: "Marcus Johnson",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    review: "Finally, a sticker maker that actually works well. I can remix my favorite prompts, preview the results instantly, and export clean PNGs for any chat app. Highly recommend!",
  },
];

const Reviews = () => {
  return (
    <Section>
      <Flex w="full" flexDirection="column">
        <Text m={8} fontSize="3xl" fontWeight="semibold" textAlign="center">What Our Users Say</Text>
        <VStack w="full" flexDirection="column" alignItems="center" gap={8}>
          {users.map((user) => (
            <Card.Root key={user.name} size="md" variant="elevated">
              <Card.Body gap="2" flexDirection="row">
                <Avatar.Root size="lg" shape="rounded">
                  <Avatar.Image src={user.avatar} />
                  <Avatar.Fallback name="Nue Camp" />
                </Avatar.Root>
                <Flex ml={4} flexDirection="column">
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Description mt={4}>
                    {user.review}
                  </Card.Description>
                </Flex>
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      </Flex>
    </Section>
  );
};

export default Reviews;
