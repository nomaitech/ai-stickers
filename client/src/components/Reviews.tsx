import { Avatar, Flex, HStack, VStack, Text } from "@chakra-ui/react";

const users = [
  {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    review: "This user has something really nice to say about our amazing product!",
  },
  {
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    review: "This user has something really nice to say about our amazing product!",
  },
];

const Reviews = () => {
  return (
    <Flex p={4} w="full"flexDirection="column">
      <Text m={8} fontSize="3xl" fontWeight="semibold" textAlign="center">Reviews</Text>
      <VStack w="full" flexDirection="column" alignItems="center" gap={8}>
        {users.map((user) => (
          <Flex w="full" gap={2} flexDirection="column" alignItems="center" key={user.name}>
            <Flex flexDirection="row" gap={4}>
              <Avatar.Root size="2xl">
                <Avatar.Fallback name={user.name} />
                <Avatar.Image src={user.avatar} />
              </Avatar.Root>
              <Text alignSelf="center" fontWeight="medium">{user.name}</Text>
              
          <Flex/>
          </Flex>
          <Flex/>
              <Text color="fg.muted" textStyle="sm">
              {user.review}
            </Text>
          <HStack/>
          
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};

export default Reviews;