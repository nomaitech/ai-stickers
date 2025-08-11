import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import Header from "../components/Header";
import ImageGenInput from "../components/ImageGenInput";
import GenButton from "../components/GenButton";
import ImageGenOutput from "../components/ImageGenOutput";
import Footer from "../components/Footer";
import Register from "../components/Register";

const Index = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [promptInputText, setPromptInputText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [enableButton, setEnableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stickerResult, setStickerResult] = useState<string | null>(null);

  useEffect(() => {
    setEnableButton(!!promptInputText && !!imageFile);
  }, [promptInputText, imageFile]);

  useEffect(()=>{
    updateCredits();
  }, [])

  const updateCredits = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const { credits } = await response.json();
        setCredits(credits);
      } else {
        localStorage.removeItem("jwt");
      }
    } catch {
      localStorage.removeItem("jwt");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setCredits(null);
  };

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
        formData.append("image", imageFile);
      }
      formData.append("prompt", promptInputText);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/generate-sticker`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const sticker = await response.json();
        setStickerResult(sticker.url);
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
      <Header
        credits={credits}
        updateCredits={updateCredits}
        logout={logout}
        showRegister={() => setShowRegister(true)}
      />
      <div className="container mx-auto px-6 py-6 flex lg:flex-row gap-6 items-stretch">
        <ImageGenInput
          setImageFileHandler={setImageFileHandler}
          promptInputText={promptInputText}
          setPromptInputText={setPromptInputText}
        />
        <GenButton
          enableButton={enableButton}
          generateSticker={generateSticker}
        />
        <ImageGenOutput isLoading={isLoading} stickerResult={stickerResult} />
      </div>
      <Footer />
      {showRegister && <Register hideRegister={() => setShowRegister(false)} />}
      <Toaster />
    </div>
  );
};

export default Index;
