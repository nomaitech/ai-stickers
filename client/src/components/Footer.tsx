import { Flex, Link, Text, Box, VStack, Separator } from "@chakra-ui/react";
import Logo from "@/components/Logo";
import { Link as RouterLink } from "react-router-dom";
const Footer = () => {
  return (
    <VStack boxShadow="0 0px 15px 0px rgba(0, 0, 0, 0.2)" py={8} px={6}>
      <Box>
        <Logo />
      </Box>
      <Text fontWeight="bold">Contact Us</Text>
      <Link href="mailto:stickers[@]nomaitech.com">stickers[@]nomaitech.com</Link>
      <Separator w="100%" my={4} />
      <Flex w="full" height={15} justify="space-around" alignItems="center">
          <RouterLink to="/terms">Terms and conditions</RouterLink>
          <RouterLink to="/privacy">Privacy Policy</RouterLink>
      </Flex>
      <Text color="orange.300" textAlign="center">2025. Made by Nomai ltd.</Text>
    </VStack>
  );
};

export default Footer;
