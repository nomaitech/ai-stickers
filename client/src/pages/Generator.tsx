import GeneratorHeader from "../components/GeneratorHeader";
import ImageUploaderChakra from "../components/ImageUploaderChakra";
import GenerationOptions from "../components/GenerationOptions";
import Output from "../components/Output";
import History from "../components/History";
import { useGenerateStickerMutation } from "../store/generation/genApi";
import { useGetUserInfoQuery } from "../store/userInfo/userApi";
import { useState, useEffect } from "react";


const Generator = () => {
    const [image, setImage] = useState<File | null>(null);
    const [emoji, setEmoji] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");
    const [enableButton, setEnableButton] = useState<boolean>(false);
    const [generateSticker, { isLoading }] = useGenerateStickerMutation();
    const { refetch } = useGetUserInfoQuery();
    const [stickerResult, setStickerResult] = useState<string | null>(null);
    useEffect(() => {
        setEnableButton(!!image && !isLoading);
    }, [image, isLoading]);

    const startGeneration = async () => {
        try {
            const formData = new FormData();
            if (image instanceof Blob) {
                formData.append("file", image);
            }
            formData.append("emoji", "😃");
            formData.append("prompt", "");
            const result = await generateSticker(formData).unwrap();
            setStickerResult(result.generated_img_url);
            setImage(null);
            setEmoji("");
            setPrompt("");
            refetch();
        } catch (err) {
            if (err && typeof err === "object" && "status" in err) {
                if ((err as { status: number }).status === 402) {
                    alert("Not enough credits");
                } else {
                    console.log(err);
                    alert("Not enough credits");
                }
            }
        }
    };

    return (
        <>
            <GeneratorHeader />
            <ImageUploaderChakra onImageUpload={setImage} image={image}/>
            <GenerationOptions onEmojiChange={setEmoji} onPromptChange={setPrompt} emoji={emoji} prompt={prompt} />
            <Output enableButton={enableButton} stickerResult={stickerResult} isLoading={isLoading} startGeneration={startGeneration} />
            <History />
        </>
    )
}

export default Generator;