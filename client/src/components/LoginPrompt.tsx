import { Box, SegmentGroup, Flex } from "@chakra-ui/react";
import { useState } from "react";

const LoginPrompt = () => {
    const [loginStatus, setLoginStatus] = useState("Login");

    return (
        <Box w="full" h="800px" backgroundColor="blue.200">
            <Flex justify="center" align="center" h="full">
                <Box w="412px" h="682px" borderRadius="2xl" backgroundColor="white">
                    <SegmentGroup.Root fontWeight={loginStatus === "Login" ? "bold" : "normal"} backgroundColor="white" boxShadow="none" value={loginStatus} onValueChange={(e) => setLoginStatus(e.value)}>
                        <SegmentGroup.Indicator backgroundColor="white" borderRadius={0} boxShadow="none" borderBottomWidth={2} borderBottomColor="black" />
                        <SegmentGroup.Items items={["Login", "Sign Up"]} />
                    </SegmentGroup.Root>
                </Box>
            </Flex>
        </Box>
    )
}

export default LoginPrompt;