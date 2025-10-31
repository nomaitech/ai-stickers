import { EmptyState, VStack, Box, Button, AbsoluteCenter } from "@chakra-ui/react";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator color="orange.300">
                        <Ghost />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                        <EmptyState.Title>Whoops! You've run out of credits</EmptyState.Title>
                        <EmptyState.Description>
                            Add more credits to keep creating more amazing stickers
                        </EmptyState.Description>
                        <Box>
                            <Button mx={2} background="orange.300" onClick={() => { stashFields(); navigate("/billing") }} fontWeight="semibold" color="orange.950">Add Credits</Button>
                            <Button mx={2} background="white" onClick={() => onClose()} fontWeight="semibold" color="gray.700" border="1px" borderColor="gray.200" borderStyle="solid">Not Now</Button>
                        </Box>
                    </VStack>
                </EmptyState.Content>
            </EmptyState.Root>
            </Box>
        </AbsoluteCenter>
        </Box>
    )
}

export default GetCreditsModal;