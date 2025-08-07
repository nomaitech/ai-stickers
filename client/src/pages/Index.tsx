import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Toaster, toast } from "sonner";
import Card from "../components/Card";
import Login from "../components/Login";
import Register from "../components/Register";
import stickerPlaceholder from "../assets/stickerPlaceholder.png";
import {
  Brush,
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  const Logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setCredits(null);
  };

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

  const ImageUploader = ({ onUpload }: { onUpload: (file: File) => void }) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
      },
      multiple: false,
      onDrop: (files) => {
        onUpload(files[0]);
      },
    });

    return (
      <div
        {...getRootProps()}
        className="p-4 border border-dashed border-blue-400 mt-2 text-center font-bold cursor-pointer flex items-center gap-2 justify-center"
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Thumbnail" className="max-h-10" />
            <span>Drag another image or click to replace</span>
          </>
        ) : (
          <span>"Drag and drop your image here or click to select"</span>
        )}
      </div>
    );
  };

  const onUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageFile(file);
    setPreviewUrl(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="border-b-1 border-border bg-white/50 backdrop-blur-sm">
        <div className="relative container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brush className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-primary">
                GenSticker
              </h1>
              <p className="text-sm text-gray-500">
                Generate personalized Telegram stickers
              </p>
            </div>
          </div>
          <div className="absolute top-1/2 right-6 lg:block transform -translate-y-1/2">
            {credits !== null ? (
              <p className="text-sm font-semibold text-muted-foreground">
                You have <span className="text-primary">{credits}</span> credits
                left. (
                <span
                  className="cursor-pointer text-destructive"
                  onClick={() => Logout()}
                >
                  Logout
                </span>
                )
              </p>
            ) : (
              <Login
                handleToken={handleToken}
                onShowRegister={() => setShowRegister(true)}
              />
            )}
          </div>
        </div>
      </div>

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
                <ImageUploader onUpload={onUpload} />
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
      {showRegister && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowRegister(false)}
        >
          <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <Register hideRegister={() => setShowRegister(false)} />
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Index;
