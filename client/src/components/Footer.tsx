import { Flex, Link, Text, Box, VStack, Separator } from "@chakra-ui/react";

const Footer = () => {
  return (
    <VStack boxShadow="0 0px 15px 0px rgba(0, 0, 0, 0.2)">
      <Box h="38px" w="175px" m={8} backgroundColor="blue.200">
        <Text>StickerSquirrel</Text>
      </Box>
      <Text fontWeight="bold">Contact Us</Text>
      <Link href="mailto:contact@gensticker.com">stickers[@]nomaitech.com</Link>
      <Separator w="90%" m={8} />
      <Flex w="full" height={15} justify="space-around" alignItems="center">
          <Link href="/terms">Terms and conditions</Link>
          <Link href="mailto:contact@gensticker.com">Privacy Policy</Link>
      </Flex>
      <Text color="orange.300" m={8}>2025. Made by Nomai ltd.</Text>
    </VStack>
  );
};

export default Footer;