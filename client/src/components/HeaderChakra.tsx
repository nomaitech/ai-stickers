import { Box, Flex, Link, Text, Icon, Separator } from "@chakra-ui/react";
import { Coins, Plus, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPrompt from "./LoginPrompt";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { openAuth } from "@/store/UI/uiSlice";
import PrimaryButton from "./PrimaryButton";
import NavDrawer from "./NavDrawer";
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
          {credits != undefined && <NavDrawer open={sidebarOpen} onOpenChange={setSidebarOpen} />}
          <Link href="/generate-sticker">
            <Box h="38px" w="175px" backgroundColor="blue.200">
              <Text>StickerSquirrel</Text>
            </Box>
          </Link>
        </Flex>
        {credits == undefined ? (
          <PrimaryButton text="Login" onClick={() => dispatch(openAuth())} fontWeight="semibold" w="auto" size="sm" />
        ) : (
          <Flex
            color="fg.muted"
            align="center"
            p={2}
            h="38px"
            onClick={() => navigate("/billing")}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            cursor="pointer"
          >
            <Icon><Coins /></Icon>
            <Text mx={2} fontWeight="semibold">{credits}</Text>
            <Separator mx={1} orientation="vertical" width="1px" h="full" />
            <Icon ><Plus /></Icon>
          </Flex>
        )}
      </Flex>
      {showAuth && <LoginPrompt />}
    </Box>
  );
}


export default HeaderChakra;