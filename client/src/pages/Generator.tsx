import GeneratorHeader from "@/components/GeneratorHeader";
import ImageUploaderChakra from "@/components/ImageUploaderChakra";
import GenerationOptions from "@/components/GenerationOptions";
import Output from "@/components/Output";
import History from "@/components/History";
import GetCreditsModal from "@/components/GetCreditsModal";
import { useCreateStickerMutation } from "@/store/mainApi";
import type { RootState } from "../store";
import { useGetUserInfoQuery } from "@/store/mainApi";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openAuth, authRegister } from "@/store/UI/uiSlice";
const Generator = () => {
    const [image, setImage] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [enableButton, setEnableButton] = useState<boolean>(false);
    const [displayTopUpPrompt, setDisplayTopUpPrompt] = useState<boolean>(false);
    const [stickerResult, setStickerResult] = useState<string | null>(null);
    const [generateSticker, { isLoading }] = useCreateStickerMutation();
    const { refetch } = useGetUserInfoQuery();
    const userInfo = useSelector((state: RootState) => state.ui.userInfo);
    const credits = userInfo?.credits;
    const dispatch = useDispatch();
    useEffect(() => {
        setEnableButton(!!image && !isLoading);
    }, [image, isLoading]);

    useEffect(() => {
        const stash = localStorage.getItem("stash");
        if (stash) {
            const { imageBase64, prompt: storedPrompt } = JSON.parse(stash);
            setPrompt(storedPrompt || "");
            if (imageBase64) {
                const byteString = atob(imageBase64.split(",")[1]);
                const mimeString = imageBase64.split(",")[0].match(/:(.*?);/)![1];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const file = new File([ab], "restored.png", { type: mimeString });
                setImage(file);
            }
        }
    }, []);

    const stashFields = async () => {
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                localStorage.setItem( "stash", JSON.stringify({ imageBase64: base64, prompt }));
            };
            reader.readAsDataURL(image);
        } else {
            localStorage.setItem("stash", JSON.stringify({ prompt }));
        }
    };

    const startGeneration = async () => {
        if (credits == undefined) {
            dispatch(authRegister());
            dispatch(openAuth());
            return
        }
        if (credits == 0) {
            setDisplayTopUpPrompt(true);
            return
        }
        try {
            if (image instanceof Blob) {
                const result = await generateSticker({original_image: image, prompt, emoji: "👍🏼"}).unwrap();
                setStickerResult(result.generated_img_url);
                setImage(null);
                setPrompt("");
                refetch();
            }
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
            <ImageUploaderChakra onImageUpload={setImage} image={image} />
            <GenerationOptions onPromptChange={setPrompt} prompt={prompt} />
            <Output enableButton={enableButton} stickerResult={stickerResult} isLoading={isLoading} startGeneration={startGeneration} />
            {credits != undefined && <History />}
            {displayTopUpPrompt && <GetCreditsModal onClose={() => setDisplayTopUpPrompt(false)} stashFields={stashFields} />}
        </>
    )
}

export default Generator;