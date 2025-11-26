import { AbsoluteCenter, Box, Tabs, CloseButton, Input, Field, Button, Text, Separator, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PasswordInput } from "./ui/password-input";
import { useForm } from "react-hook-form";
import { useLoginMutation, useRegisterMutation } from "@/store/mainApi";
import type { FormData } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeAuth, authLogin, authRegister } from "@/store/UI/uiSlice";
import type { RootState } from "../store";
import PrimaryButton from "./PrimaryButton";
const LoginPrompt = () => {
    const authOption = useSelector((state: RootState) => state.ui.authOption);
    const [login, { isLoading }] = useLoginMutation();
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register: registerForm, handleSubmit, clearErrors, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        if (authOption === "Login") {
            try {
                await login(data).unwrap();
                dispatch(closeAuth());
                await navigate("/generate-sticker");
            } catch {
                console.error("Login failed");
            }
        } else {
            try {
                await register(data).unwrap();
                dispatch(closeAuth());
                await navigate("/generate-sticker");
            } catch {
                console.error("Register failed");
            }
        }
    }

    const swapForm = (mode: string) => {
        clearErrors();
        if (mode === "Login") {
            dispatch(authLogin());
        } else {
            dispatch(authRegister());
        }
    }

    return (
        <Box position="fixed" top={0} left={0} w="100vw" h="100vh" bg="rgba(0,0,0,0.5)" overflowY="auto" zIndex={50} onClick={() => dispatch(closeAuth())}>
            <AbsoluteCenter>
                <Box w={{ base: "90vw", md: "412px" }} maxW="412px" h="682px" bg="white" borderRadius="2xl" mt={8} mb={8} onClick={(e) => { e.stopPropagation() }}>
                    <Box position="absolute" top={8} right={0}>
                        <CloseButton zIndex={1} size="2xl" borderRadius={"full"} onClick={() => dispatch(closeAuth())} />
                    </Box>
                    <Tabs.Root size="lg" value={authOption} onValueChange={(details) => swapForm(details.value)}>
                        <Tabs.Content value="Sign Up">
                            <Text mt={16} mx={10} mb={-16} fontWeight="semibold" fontSize={"xl"}>Sign up now to get <Text as="span" bgGradient="to-r" gradientFrom="purple.400" gradientTo="orange.400" bgClip='text'>2 free credits</Text> to start generating your stickers</Text>
                        </Tabs.Content>
                        <Box mx={4} mt={28}>
                            <Tabs.List>
                                <Tabs.Trigger value="Login" _selected={{ fontWeight: "bold" }} css={{ '&::before': { content: 'none' } }}>
                                    Login
                                </Tabs.Trigger>
                                <Tabs.Trigger value="Sign Up" _selected={{ fontWeight: "bold" }} css={{ '&::before': { content: 'none' } }}>
                                    Sign Up
                                </Tabs.Trigger>
                                <Tabs.Indicator height="2px" bottom="-1px" position="absolute" bg="black" transition="all 0.25s ease" />
                            </Tabs.List>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Field.Root invalid={!!errors.email}>
                                    <Input
                                        placeholder="Enter email"
                                        size="lg"
                                        mt={5}
                                        mb={2}
                                        autoFocus
                                        {...registerForm("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Invalid email",
                                            },
                                        })}
                                    />
                                    <Field.ErrorText mt={-2}>{errors.email?.message}</Field.ErrorText>
                                </Field.Root>
                                <Box w="full" mt={1} mb={3}>
                                    <Field.Root invalid={!!errors.password}>
                                        <PasswordInput
                                            placeholder="Enter password"
                                            size="lg"
                                            {...registerForm("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                            })}
                                        />
                                        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                                    </Field.Root>
                                </Box>
                                <Tabs.Content value="Login">
                                    <PrimaryButton text="Login" type="submit" loading={isLoading} />
                                </Tabs.Content>
                                <Tabs.Content value="Sign Up">
                                    <Button type="submit" backgroundColor="orange.300" w="full" size="xl" variant="solid" colorPalette="gray">
                                        <Text color="orange.800" fontWeight="semibold">Create Account</Text>
                                    </Button>
                                </Tabs.Content>
                                <Flex direction={"row"} align={"center"} w="full">
                                    <Separator flex="1" />
                                    <Text flexShrink="0" mr={8} ml={8} my={6} fontWeight="semibold">or</Text>
                                    <Separator flex="1" />
                                </Flex>
                                <Button backgroundColor="blue.300" onClick={() => console.log("Login Google")} w="full" size="xl" variant="solid" colorPalette="gray">
                                    <Text color="blue.800" fontWeight="semibold">Sign in with Google</Text>
                                </Button>
                                <Text fontSize="xs" color="fg.subtle" my={8}>
                                    By continuing, you agree to our{' '}
                                    <ChakraLink asChild display="inline" color="fg.subtle" textDecoration="underline" textUnderlineOffset="2px" textDecorationThickness="1px" _hover={{ textDecoration: "underline" }}>
                                        <Link to="/terms">
                                            Terms and Conditions, and Privacy Policy.
                                        </Link>
                                    </ChakraLink>
                                </Text>
                            </form>
                        </Box>
                    </Tabs.Root>
                </Box>
            </AbsoluteCenter>
        </Box>
    )
}

export default LoginPrompt;