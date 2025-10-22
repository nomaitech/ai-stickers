import GeneratorHeader from "@/components/GeneratorHeader";
import ImageUploaderChakra from "@/components/ImageUploaderChakra";
import GenerationOptions from "@/components/GenerationOptions";
import Output from "@/components/Output";
import History from "@/components/History";
import GetCreditsModal from "@/components/GetCreditsModal";
import { useGenerateStickerMutation } from "@/store/mainApi";
import { useGetUserInfoQuery } from "@/store/mainApi";
import { useState, useEffect } from "react";


const Generator = () => {
    const [image, setImage] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [enableButton, setEnableButton] = useState<boolean>(false);
    const [displayTopUpPrompt, setDisplayTopUpPrompt] = useState<boolean>(false);
    const [stickerResult, setStickerResult] = useState<string | null>(null);
    const [generateSticker, { isLoading }] = useGenerateStickerMutation();
    const { refetch } = useGetUserInfoQuery();
    useEffect(() => {
        setEnableButton(!!image && !isLoading);
    }, [image, isLoading]);

    const startGeneration = async () => {
        try {
            const formData = new FormData();
            if (image instanceof Blob) {
                formData.append("file", image);
            }
            formData.append("prompt", prompt);
            const result = await generateSticker(formData).unwrap();
            setStickerResult(result.generated_img_url);
            setImage(null);
            setPrompt("");
            refetch();
        } catch (err) {
            if (err && typeof err === "object" && "status" in err) {
                if ((err as { status: number }).status === 402) {
                    setDisplayTopUpPrompt(true);
                } else {
                    console.log(err);
                }
            }
        }
    };

    return (
        <>
            <GeneratorHeader />
            <ImageUploaderChakra onImageUpload={setImage} image={image}/>
            <GenerationOptions onPromptChange={setPrompt} prompt={prompt} />
            <Output enableButton={enableButton} stickerResult={stickerResult} isLoading={isLoading} startGeneration={startGeneration} />
            <History />
            {displayTopUpPrompt && <GetCreditsModal onClose={() => setDisplayTopUpPrompt(false)} />}
        </>
    )
}

export default Generator;