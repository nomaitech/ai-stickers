import { Box, Flex, Button, Link, Text } from "@chakra-ui/react";
import LoginPrompt from "./LoginPrompt";

const HeaderChakra = () => {
  return (
    <Box bg="white" px={6} py={4} boxShadow="sm">
      <Flex align="center" justify="space-between">
        <Link>
            <Box h="38px" w="175px" backgroundColor="blue.200">
                <Text>StickerSquirrel</Text>
            </Box>
        </Link>
        <Button backgroundColor="orange.200">
        <Text fontWeight="semibold" color="orange.800">
            Login
          </Text>
        </Button>
      </Flex>
    </Box>
  );
}


export default HeaderChakra;