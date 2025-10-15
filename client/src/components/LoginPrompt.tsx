import { AbsoluteCenter, Box, Tabs, CloseButton, Input, Field, Button, Text, Separator, Flex, Link } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
const LoginPrompt = () => {
    return (
        <Box w="full" h="800px" backgroundColor="blue.200">
            <AbsoluteCenter>
                <Box w="412px" h="682px" borderRadius="2xl" backgroundColor="white">
                    <Box position="absolute" top={1} right={1}>
                        <CloseButton size="2xl" borderRadius={"full"}/>
                    </Box>
                    <Box mx={4} mt={28}>
                        <Tabs.Root size="lg" defaultValue="Login">
                            <Tabs.List>
                                <Tabs.Trigger value="Login" _selected={{ fontWeight: "bold" }} css={{ '&::before': { content: 'none' } }}>
                                    Login
                                </Tabs.Trigger>
                                <Tabs.Trigger value="Sign Up" _selected={{ fontWeight: "bold" }} css={{ '&::before': { content: 'none' } }}>
                                    Sign Up
                                </Tabs.Trigger>
                                <Tabs.Indicator height="2px" bottom="-1px" position="absolute" bg="black" transition="all 0.25s ease" />
                            </Tabs.List>
                            <Field.Root>
                                <Input placeholder="Enter email" css={{ "--focus-color": "colors.orange.300", "--error-color": "red" }} size="lg" mt={5} mb={2} />
                                <Box w="full" mt={1} mb={3}>
                                <PasswordInput placeholder="Enter password" css={{ "--focus-color": "colors.orange.300", "--error-color": "red" }} size="lg"/>
                                </Box>
                                <Field.ErrorText>Invalid Email or Password</Field.ErrorText>
                                <Tabs.Content value="Login">
                                    <Button backgroundColor="orange.300" onClick={() => console.log("Login")} w="full" size="xl" variant="solid" colorPalette="gray">
                                        <Text color="orange.800" fontWeight="semibold">Login</Text>
                                    </Button>
                                </Tabs.Content>
                                <Tabs.Content value="Sign Up">
                                    <Button backgroundColor="orange.300" onClick={() => console.log("Creation")} w="full" size="xl" variant="solid" colorPalette="gray">
                                        <Text color="orange.800" fontWeight="semibold">Sign Up</Text>
                                    </Button>
                                </Tabs.Content>
                                <Flex direction={"row"} align={"center"} w="full">
                                    <Separator flex="1" />
                                    <Text flexShrink="0" mr={8} ml={8} my={6} fontWeight="semibold">or</Text>
                                    <Separator flex="1" />
                                </Flex>
                                <Button backgroundColor="blue.300" onClick={() => console.log("Login")} w="full" size="xl" variant="solid" colorPalette="gray">
                                    <Text color="blue.800" fontWeight="semibold">Sign in with Google</Text>
                                </Button>
                                <Text fontSize="xs" color="fg.subtle" my={8}>
                                    By continuing, you agree to our{' '}
                                    <Link href="/terms" display="inline" color="fg.subtle" textDecoration="underline" textUnderlineOffset="2px" textDecorationThickness="1px" _hover={{ textDecoration: "underline" }}>
                                        Terms and Conditions, and Privacy Policy.
                                    </Link>
                                </Text>
                            </Field.Root>
                        </Tabs.Root>
                    </Box>
                </Box>
            </AbsoluteCenter>
        </Box>
    )
}

export default LoginPrompt;