import { Box, Flex, Button, Link, Text, Icon, Separator} from "@chakra-ui/react";
import { Coins, Plus } from "lucide-react";
import { useState } from "react";
import LoginPrompt from "./LoginPrompt";
import useTopUp from "../hooks/useTopUp";
import type { RootState } from "../store";
import { useSelector } from "react-redux";

const HeaderChakra = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.ui.userInfo);
  const credits = userInfo?.credits;
  const topUp = useTopUp();
  return (
    <Box bg="white" px={6} py={4} boxShadow="md">
      <Flex align="center" justify="space-between">
        <Link>
          <Box h="38px" w="175px" backgroundColor="blue.200">
            <Text>StickerSquirrel</Text>
          </Box>
        </Link>
        {credits == undefined ? (
          <Button backgroundColor="orange.300" onClick={() => setAuthOpen(true)} fontWeight="semibold" color="orange.800">
            Login
          </Button>
        ) : (
          <Box h="38px" w="112px" position="relative" onClick={topUp} borderRadius="md" borderStyle={"solid"} borderColor="gray.200" borderWidth="1px" _hover={{ cursor: "pointer" }}>
            <Icon position="absolute" color="grey" left={2} top={1.5}><Coins /></Icon>
            <Text color="grey" position="absolute" fontWeight="semibold" left={11} top={1.5}>{credits}</Text>
            <Separator orientation={"vertical"} position="absolute"  top={1.5} right={11} width="1px" height="26px" />
            <Icon position="absolute" color="grey" right={2} top={1.5}><Plus/></Icon>
          </Box>
        )}
      </Flex>
      {authOpen && <LoginPrompt onClose={() => setAuthOpen(false)} />}
    </Box>
  );
}


export default HeaderChakra;