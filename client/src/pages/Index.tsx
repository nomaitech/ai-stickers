import { useState, useEffect } from "react";
import { toast } from "sonner";
import ImageGenInput from "../components/ImageGenInput";
import GenButton from "../components/GenButton";
import ImageGenOutput from "../components/ImageGenOutput";
import { useGenerateStickerMutation } from "../store/generation/genApi";
import { useGetUserInfoQuery } from "../store/userInfo/userApi";

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [enableButton, setEnableButton] = useState(false);
  const [stickerResult, setStickerResult] = useState<string | null>(null);

  const [generateSticker, { isLoading, data }] = useGenerateStickerMutation();
  const { refetch } = useGetUserInfoQuery();
  useEffect(() => {
    setEnableButton(!!imageFile && !isLoading);
  }, [imageFile, isLoading]);

  useEffect(() => {
    if (data) {
      setStickerResult(data.image);
      refetch();
    }
  }, [data, refetch]);

  const startGeneration = async () => {
    try {
      const formData = new FormData();
      if (imageFile instanceof Blob) {
        formData.append("file", imageFile);
      }
      formData.append("emoji", "😃");
      formData.append("prompt", "");
      generateSticker(formData);
    } catch (err) {
      console.log(err);
      toast("Generation failed");
    }
  };

  return (
    <div className="h-full w-full">
      <div className="h-full w-full container mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6 items-stretch sm:py-3">
        <ImageGenInput setImageFileHandler={setImageFile} />
        <GenButton
          enableButton={enableButton}
          startGeneration={startGeneration}
        />
        <ImageGenOutput isLoading={isLoading} stickerResult={stickerResult} />
      </div>
    </div>
  );
};

export default Index;
