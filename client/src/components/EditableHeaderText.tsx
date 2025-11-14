import { Heading, IconButton, Editable, HStack } from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { useState } from "react";
import { useRenameStickerPackMutation } from "../store/mainApi";
type EditableHeaderTextProps = {
    packName: string
    packId: string
}

const EditableHeaderText = ({ packName, packId }: EditableHeaderTextProps) => {
    const [name, setName] = useState(packName);
    const [changeName] = useRenameStickerPackMutation();

    const onChange = (newName: string) =>{
        setName(newName);
        changeName({name: newName, packId: packId}).unwrap();
    }

    return (
        <Editable.Root defaultValue={name} activationMode="none" onValueCommit={(e) => onChange(e.value)} mt={4}>
            <Editable.Preview _hover={{ cursor: "default", bg: "transparent" }}>
                <Heading size="lg" bgGradient="to-l" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">{name}</Heading>
            </Editable.Preview>
            <Editable.Input fontSize="xl" fontWeight="semibold" bg="transparent" color="gray.800" _focus={{ boxShadow: "none" }} />
            <HStack>
                <Editable.Control>
                    <Editable.EditTrigger asChild>
                        <IconButton color="gray.400" aria-label="edit" variant="ghost" size="sm">
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
    )
};

export default EditableHeaderText;
