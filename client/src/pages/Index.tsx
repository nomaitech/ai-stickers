import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import ImageGenInput from "../components/ImageGenInput";
import GenButton from "../components/GenButton";
import ImageGenOutput from "../components/ImageGenOutput";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Register from "../components/Register";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Index = () => {
  const showRegister = useSelector((state: RootState) => state.ui.showRegister); 
  const [credits, setCredits] = useState<number | null>(null);
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
      <div className="h-full w-full container mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6 items-stretch sm:py-3">
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Header
        credits={credits}
        updateCredits={updateCredits}
        logout={logout}
      />
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
      <Footer />
      {showRegister && <Register />}
      <Toaster />
    </div>
    </div>
  );
};

export default Index;
