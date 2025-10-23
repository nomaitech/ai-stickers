import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex p={4} height={30} direction="column" align="center" boxShadow="0 -4px 6px rgba(0, 0, 0, 0.2)">
      <Flex w="full" height={15} justify="space-between" alignItems="center">
        <div>
          <Link variant="underline" href="/terms">Terms and conditions</Link>
        </div>
        <div>
          <Link variant="underline" href="mailto:contact@gensticker.com">Contact Us</Link>
        </div>
      </Flex>
        <Text fontSize="sm" color="fg.muted" p={4} textAlign="center">Missing features? Email contact@gensticker.com and we might add them!</Text>
    </Flex>
  );
};

export default Footer;