import { useState, useEffect } from "react";
import Section from "./Section";
import { Upload } from "lucide-react";
import { FileUpload, Icon, Text, Image, Box } from "@chakra-ui/react";

type ImageUploaderProps = {
    onImageUpload: (file: File) => void
    image: File | null
}
const ImageUploaderChakra = ({ onImageUpload, image }: ImageUploaderProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onImageUpload(file);
    };

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);
        } else {
            setPreview(null);
        }
    }, [image]);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const item = e.clipboardData?.items[0];
            if (!item) return;
            const file = item.getAsFile();
            if (!file) return;
            if (!allowedTypes.includes(file.type)) return;
            const url = URL.createObjectURL(file);
            onImageUpload(file);
            setPreview(url);
        };
        window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, []);

    return (
        <Section>
            <Text color="text/fg" fontWeight="semibold">
                Upload your image *
            </Text>
            <FileUpload.Root my={5} alignItems="stretch">
                <FileUpload.HiddenInput
                    accept="image/*"
                    onChange={handleFileChange}
                />
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
                            <Icon size="md" color="orange.300" pointerEvents="none">
                                <Upload />
                            </Icon>
                            <FileUpload.DropzoneContent pointerEvents="none">
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
