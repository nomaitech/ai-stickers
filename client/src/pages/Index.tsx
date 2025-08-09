import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import Card from "../components/Card";
import Header from "../components/Header";
import Register from "../components/Register";
import ImageUploader from "../components/ImageUploader";
import stickerPlaceholder from "../assets/stickerPlaceholder.png";
import {
  Image,
  ArrowRight,
  Sticker,
  Pen,
  LoaderCircle,
} from "lucide-react";
import clsx from "clsx";

const Index = () => {
  const [promptInputText, setPromptInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [enableButton, setEnableButton] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [stickerResult, setStickerResult] = useState<string | null>(null);

  useEffect(() => {
    setEnableButton(!!promptInputText && !!imageFile);
  }, [promptInputText, imageFile]);

  useEffect(() => {
    updateCredits();
  }, [token]);

  const updateCredits = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch("/api/credits", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const { credits } = await response.json();
        setCredits(credits);
      } else {
        setToken(null);
        localStorage.removeItem("jwt");
      }
    } catch {
      localStorage.removeItem("jwt");
    }
  };

  const handleToken = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setCredits(null);
  };

  const setImageFileHandler = (file: File) => {
    setImageFile(file);
  }
  const generateSticker = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (typeof token === "string") {
        formData.append("token", token);
      }
      if (imageFile instanceof Blob) {
        formData.append("image", imageFile);
      }
      formData.append("prompt", promptInputText);
      const response = await fetch("/api/stickers", {
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
        handleToken={handleToken}
        logout={logout}
        showRegister={() => setShowRegister(true)}
      />
      <div className="container mx-auto px-6 py-6 flex lg:flex-row gap-6 items-stretch">
        <div className="flex-1">
          <Card>
            <div>
              <h3 className="flex items-center gap-2 text-lg text-green-700">
                <Image className="h-5 w-5" />
                Upload your image
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your image here
              </p>
              <div>
                <ImageUploader setImageFileHandler={setImageFileHandler} />
              </div>
            </div>

            <span className="w-full mt-10 mb-10 bg-primary h-[2px]" />

            <div>
              <h3 className="flex items-center gap-2 text-lg text-red-700">
                <Pen className="h-5 w-5" />
                Describe what you want
              </h3>
              <p className="text-sm text-muted-foreground">
                Gimme some text to work with
              </p>
              <textarea
                placeholder="Describe what you want"
                value={promptInputText}
                onChange={(e) => setPromptInputText(e.target.value)}
                className="min-h-[400px] w-full text-sm leading-relaxed border border-blue-200 focus:border-blue-400 resize-none p-3 mt-2"
              />
            </div>
          </Card>
        </div>

        <div
          className={clsx("flex items-center justify-center", {
            "pointer-events-none opacity-50": !enableButton,
          })}
        >
          <button
            className="min-w-[160px] rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-8 flex items-center gap-2 pt-4 pb-4"
            onClick={generateSticker}
          >
            Generate Sticker
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1">
          <Card>
            <h3 className="flex items-center gap-2 text-lg text-purple-700">
              <Sticker className="h-5 w-5" />
              Receive your sticker
            </h3>
            <p className="text-sm text-muted-foreground">
              Render personalized sticker
            </p>
            <div className="flex items-center justify-center">
              {isLoading ? (
                <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
              ) : stickerResult ? (
                <img src={stickerResult} className="w-full mt-2" />
              ) : (
                <img src={stickerPlaceholder} className="w-full mt-2" />
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Input an image with some description, get a cool sticker
        </p>
      </div>
      {showRegister && <Register hideRegister={() => setShowRegister(false)} />}
      <Toaster />
    </div>
  );
};

export default Index;
