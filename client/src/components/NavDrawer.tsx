import { useDispatch } from "react-redux";
import { removeToken } from "@/store/auth/authSlice";
import { Drawer, CloseButton, Button, Flex, Box, Text, Link, Separator } from "@chakra-ui/react"
import { resetUserInfo } from "@/store/UI/uiSlice";
import { mainApi } from "@/store/mainApi";
import { Palette, Heart, Wallet, LogOut, Menu } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";
const links = [
    { to: "/generate-sticker", label: "Generate Stickers", icon: <Palette /> },
    { to: "/my-stickers", label: "My Stickers", icon: <Heart /> },
    { to: "/billing", label: "Billing", icon: <Wallet /> },
]

type NavDrawerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}
const NavDrawer = ({ open, onOpenChange }: NavDrawerProps) => {

    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate();

    const logout = () => {
        dispatch(removeToken());
        dispatch(resetUserInfo());
        dispatch(mainApi.util.resetApiState());
    }

    return (
        <Drawer.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} placement="start">
            <Drawer.Backdrop />
            <Drawer.Trigger asChild mr={4}>
                <Menu />
            </Drawer.Trigger>
            <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.CloseTrigger />
                    <Drawer.Header>
                        <Flex>
                            <Link href="/generate-sticker">
                                <Box h="38px" w="175px" backgroundColor="blue.200">
                                    <Text>StickerSquirrel</Text>
                                </Box>
                            </Link>
                            <Drawer.CloseTrigger asChild mt={1}>
                                <CloseButton size="md" />
                            </Drawer.CloseTrigger>
                        </Flex>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Separator position="absolute" top={20} left={0} width="100%" height="1px" />
                        <Flex direction="column" position="absolute" left={4} top={28} right={6}>
                            {links.map(({ to, label, icon }) => {
                                const isActive = location.pathname === to
                                return (
                                    <Button
                                        key={to}
                                        onClick={() => { navigate(to); onOpenChange(false); }}
                                        bg={isActive ? "orange.300" : "white"}
                                        color={isActive ? "orange.800" : "gray.fg"}
                                        my={1}
                                        fontWeight="bold"
                                        justifyContent="flex-start"
                                        textAlign="left"
                                        border="2px solid transparent"
                                        _hover={{ borderColor: "orange.400" }}>
                                        {icon} {label}
                                    </Button>
                                )
                            })}
                        </Flex>
                        <Button
                            bg="white"
                            position="absolute"
                            left={3}
                            bottom={5}
                            onClick={() => { logout(); onOpenChange(false); navigate("/"); }}
                            color="gray.800"
                            fontWeight="bold"
                            justifyContent="flex-start"
                            textAlign="left"
                            _hover={{ backgroundColor: "gray.100" }}>
                            <LogOut /> Logout
                        </Button>
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    )
}

export default NavDrawer;