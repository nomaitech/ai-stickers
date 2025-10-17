import { useState } from "react";
import Section from "./Section";
import { Upload } from "lucide-react";
import { FileUpload, Icon, Text, Image, Box } from "@chakra-ui/react";

const ImageUploaderChakra = () => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    };

    return (
        <Section>
            <Text color="text/fg" fontWeight="semibold">
                Upload your image *
            </Text>
            <FileUpload.Root my={5} alignItems="stretch">
                <FileUpload.HiddenInput onChange={handleFileChange} />
                <FileUpload.Dropzone>
                    {preview ? (
                        <Box mt={4} pointerEvents="none">
                            <Image
                                src={preview}
                                alt="Preview"
                                maxH="250px"
                                borderRadius="md"
                                boxShadow="md"
                            />
                        </Box>
                    ) : (
                        <>
                            <Icon size="md" color="orange.300">
                                <Upload />
                            </Icon>
                            <FileUpload.DropzoneContent>
                                <Text fontWeight="semibold" fontSize="md">
                                    Drop your image here or click to upload
                                </Text>
                                <Text color="fg.subtle" fontSize="md">
                                    Only supports PNG, JPG and WEBP formats
                                </Text>
                            </FileUpload.DropzoneContent>
                        </>
                    )}
                </FileUpload.Dropzone>
            </FileUpload.Root>
        </Section>
    );
};

export default ImageUploaderChakra;
