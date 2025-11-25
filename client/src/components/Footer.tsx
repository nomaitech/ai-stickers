import { Flex, Link, Text, Box, VStack, Separator } from "@chakra-ui/react";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <VStack boxShadow="0 0px 15px 0px rgba(0, 0, 0, 0.2)" spacing={4} py={8} px={6}>
      <Box>
        <Logo />
      </Box>
      <Text fontWeight="bold">Contact Us</Text>
      <Link href="mailto:stickers[@]nomaitech.com">stickers[@]nomaitech.com</Link>
      <Separator w="100%" my={4} />
      <Flex w="full" justify="space-between" wrap="wrap" gap={2}>
        <Link href="/terms">Terms and conditions</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </Flex>
      <Text color="orange.300" textAlign="center">2025. Made by Nomai ltd.</Text>
    </VStack>
  );
};

export default Footer;
