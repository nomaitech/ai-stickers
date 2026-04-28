import { Dialog, CloseButton, Tabs, Text, Box, Field, Input, Link as ChakraLink, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { PasswordInput } from "./ui/password-input";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "@/store/mainApi";
import { useNavigate } from "react-router-dom";
import type { FormData } from "../types";
import type { RootState } from "../store";
import { useEffect } from "react";
import { closeAuth, authLogin, authRegister } from "@/store/UI/uiSlice";

type LoginDialogProps = {
    open: boolean
}

const LoginDialog = ({ open }: LoginDialogProps) => {
    const authOption = useSelector((state: RootState) => state.ui.authOption);

    const [login, { isLoading }] = useLoginMutation();
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { register: registerForm, handleSubmit, clearErrors, setFocus, formState: { errors } } = useForm<FormData>();
useEffect(() => {
    setFocus("email");
}, [authOption, setFocus]);

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
        <Dialog.Root open={open} onOpenChange={(e) => { if (!e.open) dispatch(closeAuth()) }} placement="center">
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content maxW="412px" height="682px">
                    <Dialog.Body p={0}>
                        <Tabs.Root size="lg" value={authOption} onValueChange={(details) => swapForm(details.value)}>
                            <Tabs.Content value="Sign Up">
                                <Text mt={16} mx={10} mb={-16} lineHeight="30px" fontFamily="body" fontWeight="semibold" fontSize={"xl"}>Sign up now to get <Text as="span" bgGradient="to-r" gradientFrom="purple.400" gradientTo="orange.400" bgClip='text'>2 free credits</Text> to start generating your stickers</Text>
                            </Tabs.Content>
                            <Box mx={4} mt={28}>
                                <Tabs.List>
                                    <Tabs.Trigger value="Login" _selected={{ fontWeight: "bold" }} css={{ '&::before': { content: 'none' } }}>
                                        Login
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="Sign Up" _selected={{ fontWeight: "bold" }} css={{ '&::before': { content: 'none' } }}>
                                        Sign Up
                                    </Tabs.Trigger>
                                    <Tabs.Indicator height="2px" bottom="-1px" position="absolute" bg="black" />
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
                                            <Text color="orange.950" fontWeight="semibold">Create Account</Text>
                                        </Button>
                                    </Tabs.Content>
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
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="xl" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}

export default LoginDialog