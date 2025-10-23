import { Box, Button, CloseButton, Link, Text, Separator, Flex } from "@chakra-ui/react"
import RouterButton from "./RouterButton"
import { Palette, Heart, Wallet, LogOut } from "lucide-react"
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "@/store/auth/authSlice";
import { resetUserInfo } from "@/store/UI/uiSlice";
import { mainApi } from "@/store/mainApi";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ onClose, sidebarOpen }: { onClose: () => void, sidebarOpen: boolean }) => {
    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate(); 
    const logout = () => {
        dispatch(removeToken());
        dispatch(resetUserInfo());
        dispatch(mainApi.util.resetApiState());
    }

    const links = [
        { to: "/generate-sticker", label: "Generate Stickers", icon: <Palette /> },
        { to: "/my-stickers", label: "My Stickers", icon: <Heart /> },
        { to: "/billing", label: "Billing", icon: <Wallet /> },
    ]

    return (
        <Box
            h="100vh"
            w="100vw"
            bg="rgba(0,0,0,0.5)"
            position="fixed"
            top={0}
            left={0}
            zIndex={100}
            onClick={onClose}
            opacity={sidebarOpen ? 1 : 0}
            pointerEvents={sidebarOpen ? "auto" : "none"}
            transition="opacity 0.3s ease"
        >
            <Box
                h="100dvh"
                w="80vw"
                bg="white"
                position="fixed"
                top={0}
                left={0}
                zIndex={1000}
                transform={sidebarOpen ? "translateX(0)" : "translateX(-100%)"}
                transition="transform 0.3s ease"
                onClick={(e) => e.stopPropagation()}
            >                <Box>
                    <Link href="/generate-sticker" mt={4} ml={4}>
                        <Box h="38px" w="175px" backgroundColor="blue.200">
                            <Text>StickerSquirrel</Text>
                        </Box>
                    </Link>
                    <CloseButton onClick={onClose} position="absolute" top={4} right={4} />
                </Box>
                <Separator position="absolute" top={20} left={0} width="100%" height="1px" />
                <Flex direction="column" position="absolute" left={4} top={28} right={6}>
                    {links.map(({ to, label, icon }) => {
                        const isActive = location.pathname === to
                        return (
                            <RouterButton
                                key={to}
                                as={RouterLink}
                                to={to}
                                onClick={onClose}
                                bg={isActive ? "orange.100" : "white"}
                                color="gray.800"
                                fontWeight="bold"
                                justifyContent="flex-start"
                                textAlign="left"
                                border="2px solid transparent"
                                _hover={{ borderColor: "orange.400" }}
                            >
                                {icon} {label}
                            </RouterButton>
                        )
                    })}
                </Flex>
                <Separator position="absolute" bottom="93px" left={0} width="100%" height="1px" />
                <Button bg="white" position="absolute" left={3} bottom={8} onClick={() => { logout(); onClose(); navigate("/") }} color="gray.800" fontWeight="bold" justifyContent="flex-start" textAlign="left" _hover={{ backgroundColor: "gray.100" }}>
                    <LogOut /> Logout
                </Button>
            </Box>
        </Box>
    )
}

export default Sidebar
