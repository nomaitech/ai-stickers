import { AbsoluteCenter, Box, Icon, Text, Button, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Ghost } from "lucide-react"

type GetCreditsModalProps = {
    onClose: () => void
    stashFields: () => void
}
const GetCreditsModal = ({ onClose, stashFields }: GetCreditsModalProps) => {
    const navigate = useNavigate();

    return (
        <Box position="fixed" top={0} left={0} w="100vw" h="100vh" bg="rgba(0,0,0,0.5)" overflowY="auto" zIndex={50} onClick={() => onClose()}>
            <AbsoluteCenter>
                <Box w="412px" bg="white" borderRadius="2xl" mt={8} mb={8} onClick={(e) => { e.stopPropagation() }}>
                    <Flex direction="column" align="center">
                        <Icon color="orange.300" w={8} h={8} mt={12}><Ghost /></Icon>
                        <Text fontWeight="semibold" my={6}>Whoops! You've run out of credits</Text>
                        <Text color="grey">Add more credits to keep creating</Text>
                        <Text color="grey">more amazing stickers</Text>
                        <Box mt={6} mb={12}>
                            <Button mx={2} background="orange.300" onClick={() => {stashFields(); navigate("/billing")}} fontWeight="semibold" color="orange.950">Add Credits</Button>
                            <Button mx={2} background="white" onClick={() => onClose() } fontWeight="semibold" color="gray.700" border="1px" borderColor="gray.200" borderStyle="solid">Not Now</Button>
                        </Box>
                    </Flex>
                </Box>
            </AbsoluteCenter>
        </Box>

    )
}

export default GetCreditsModal