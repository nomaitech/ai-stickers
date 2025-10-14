import { Flex, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex height={20} justify="space-between" alignItems="center">
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