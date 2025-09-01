import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import ImageGenInput from "../components/ImageGenInput";
import GenButton from "../components/GenButton";
import ImageGenOutput from "../components/ImageGenOutput";

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [enableButton, setEnableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stickerResult, setStickerResult] = useState<string | null>(null);

  const { updateCredits, domainUrl } = useOutletContext<{
  updateCredits: () => void;
  domainUrl: string;
}>();

  useEffect(() => {
    setEnableButton(!!imageFile && !isLoading);
  }, [imageFile, isLoading]);

  const setImageFileHandler = (file: File) => {
    setImageFile(file);
  };

  const generateSticker = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const token = localStorage.getItem("jwt");
      if (typeof token === "string") {
        formData.append("token", token);
      }
      if (imageFile instanceof Blob) {
        formData.append("file", imageFile);
      }
      const response = await fetch(`${domainUrl}/generate-sticker`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const stickerData = await response.blob();
        const blob = new Blob([stickerData], { type: "image/png" });
        const sticker = URL.createObjectURL(blob);
        setStickerResult(sticker);
        updateCredits();
        setIsLoading(false);
        toast.success("Sticker generated!");
      } else {
        setIsLoading(false);
        toast.error("Generation failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="h-full container mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6 items-stretch sm:py-3">
        <ImageGenInput
          setImageFileHandler={setImageFileHandler}
        />
        <GenButton
          enableButton={enableButton}
          generateSticker={generateSticker}
        />
        <ImageGenOutput isLoading={isLoading} stickerResult={stickerResult} />
      </div>
    </div>
  );
};

export default Index;
