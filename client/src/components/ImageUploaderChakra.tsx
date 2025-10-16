import Section from "./Section";
import { Upload } from "lucide-react";
import { FileUpload, Icon, Text } from "@chakra-ui/react";

const ImageUploaderChakra = () => {

    return (
        <Section>
            <Text px={2} color="text/fg" fontWeight="semibold">Upload your image *</Text>
            <FileUpload.Root px={2} my={5} alignItems="stretch">
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone>
                    <Icon size="md" color="orange.300">
                        <Upload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                        <Text fontWeight="semibold" fontSize={"md"}>Drop your image her or click to upload</Text>
                        <Text color="fg.subtle" fontSize={"md"}>Only supports PNG, JPG and WEBP formats</Text>
                    </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
            </FileUpload.Root>
        </Section>
    )
}

export default ImageUploaderChakra