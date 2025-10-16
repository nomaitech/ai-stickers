import { Flex, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex p={4} height={20} justify="space-between" alignItems="center" boxShadow="0 -4px 6px rgba(0, 0, 0, 0.2)">
      <div>
        <Link variant="underline" href="/terms">Terms and conditions</Link>
      </div>
      <div>
        <Link variant="underline" href="mailto:contact@gensticker.com">Contact Us</Link>
      </div>
    </Flex>
  );
};

export default Footer;