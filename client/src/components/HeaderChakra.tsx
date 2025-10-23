import { Box, Flex, Button, Link, Text, Icon, Separator } from "@chakra-ui/react";
import { Coins, Plus, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPrompt from "./LoginPrompt";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { openAuth } from "@/store/UI/uiSlice";
import Sidebar from "./Sidebar";
const HeaderChakra = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showAuth = useSelector((state: RootState) => state.ui.showAuth);
  const userInfo = useSelector((state: RootState) => state.ui.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const credits = userInfo?.credits;
  return (
    <Box bg="white" px={6} py={4} boxShadow="md">
      <Flex align="center" justify="space-between">
        <Flex alignItems="center">
          {credits != undefined && <Icon position="relative" left="-1px" onClick={() => setSidebarOpen(!sidebarOpen)} mr={4}>
            <Menu />
          </Icon>}
          <Link href="/generate-sticker">
            <Box h="38px" w="175px" backgroundColor="blue.200">
              <Text>StickerSquirrel</Text>
            </Box>
          </Link>
        </Flex>
        {credits == undefined ? (
          <Button backgroundColor="orange.300" h="38px" onClick={() => dispatch(openAuth())} fontWeight="semibold" color="orange.800">
            Login
          </Button>
        ) : (
          <Box h="38px" w="112px" position="relative" onClick={() => { navigate("/billing") }} borderRadius="md" borderStyle={"solid"} borderColor="gray.200" borderWidth="1px" _hover={{ cursor: "pointer" }}>
            <Flex position="absolute" direction="row" justifyContent="space-between" w="50px" left={2} top={1.5}>
              <Icon color="fg.muted"><Coins /></Icon>
              <Flex align="center" justify="center" textAlign="center" w="full" ml={2}>
                <Text color="fg.muted" fontWeight="semibold">{credits}</Text>
              </Flex>
            </Flex>
            <Separator orientation="vertical" position="absolute" top={1.5} right={11} width="1px" height="26px" />
            <Icon position="absolute" color="fg.muted" right={2} top={1.5}><Plus /></Icon>
          </Box>
        )}
      </Flex>
      {showAuth && <LoginPrompt />}
      <Sidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </Box>
  );
}


export default HeaderChakra;