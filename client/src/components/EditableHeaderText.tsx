import {
    Heading,
    IconButton,
    Editable,
    HStack,
} from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

const EditableHeaderText = () => (
    <Editable.Root defaultValue="Telegram Sticker Packs">
        <Editable.Preview>
            <Heading size="4xl" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Whew</Heading>
        </Editable.Preview>
        <Editable.Input fontSize="xl" fontWeight="semibold" bg="transparent" color="gray.800" _focus={{ boxShadow: "none" }}/>
        <HStack>
            <Editable.Control>
                <Editable.EditTrigger asChild>
                    <IconButton aria-label="edit" variant="ghost" size="sm">
                        <LuPencilLine />
                    </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                    <IconButton aria-label="cancel" variant="outline" size="sm">
                        <LuX />
                    </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                    <IconButton aria-label="save" variant="outline" size="sm">
                        <LuCheck />
                    </IconButton>
                </Editable.SubmitTrigger>
            </Editable.Control>
        </HStack>
    </Editable.Root>
);

export default EditableHeaderText;
