import { Box, Flex, Button, Link, Text, Icon, Separator } from "@chakra-ui/react";
import { Coins, Plus, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPrompt from "./LoginPrompt";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
const HeaderChakra = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.ui.userInfo);
  const navigate = useNavigate();
  const credits = userInfo?.credits;
  return (
    <Box bg="white" px={6} py={4} boxShadow="md">
      <Flex align="center" justify="space-between">
        <Flex alignItems="center">
          <Icon onClick={() => setSidebarOpen(!sidebarOpen)} mr={4}>
            <Menu />
          </Icon>
          <Link>
            <Box h="38px" w="175px" backgroundColor="blue.200">
              <Text>StickerSquirrel</Text>
            </Box>
          </Link>
        </Flex>
        {credits == undefined ? (
          <Button backgroundColor="orange.300" h="38px" onClick={() => setAuthOpen(true)} fontWeight="semibold" color="orange.800">
            Login
          </Button>
        ) : (
          <Box h="38px" w="112px" position="relative" onClick={() => { navigate("/billing") }} borderRadius="md" borderStyle={"solid"} borderColor="gray.200" borderWidth="1px" _hover={{ cursor: "pointer" }}>
            <Flex position="absolute" direction="row" justifyContent="space-between" w="50px" left={2} top={1.5}>
              <Icon color="grey"><Coins /></Icon>
              <Text color="grey" fontWeight="semibold">{credits}</Text>
            </Flex>
            <Separator orientation={"vertical"} position="absolute" top={1.5} right={11} width="1px" height="26px" />
            <Icon position="absolute" color="grey" right={2} top={1.5}><Plus /></Icon>
          </Box>
        )}
      </Flex>
      {authOpen && <LoginPrompt onClose={() => setAuthOpen(false)} />}
      <Sidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </Box>
  );
}


export default HeaderChakra;