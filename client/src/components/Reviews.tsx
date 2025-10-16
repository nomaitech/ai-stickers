import { Avatar, Flex, VStack, Text, Card } from "@chakra-ui/react";
import Section from "./Section";
const users = [
  {
    name: "Arom Kim",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    review: "This user has something really nice to say about our amazing product!",
  },
  {
    name: "Theo Papadopoulos",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    review: "This user has something really nice to say about our amazing product!",
  },
  {
    name: "Lewis Carrot",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    review: "This user has something really nice to say about our amazing product!",
  },
];

const Reviews = () => {
  return (
    <Section>
      <Flex w="full" flexDirection="column">
        <Text m={8} fontSize="3xl" fontWeight="semibold" textAlign="center">Reviews</Text>
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