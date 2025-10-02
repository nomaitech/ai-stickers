import Card from "./Card";
import { Sticker, LoaderCircle } from "lucide-react";
import { Line } from '@rc-component/progress';
import stickerPlaceholder from "../assets/stickerPlaceholder.png";
import { useState, useEffect } from "react";

type Props = {
  isLoading: boolean;
  stickerResult: string | null;
};

const ImageGenOutput = ({ isLoading, stickerResult }: Props) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalId);
            return 100;
          }
          return prev + 0.2;
        });
      }, 200);
      return () => clearInterval(intervalId);
    }else{
      setLoadingProgress(0);
    }
  }, [isLoading]);

  return (
    <div className="lg:min-h-[665px] flex-1">
      <Card>
        <h3 className="flex items-center gap-2 text-lg text-purple-700">
          <Sticker className="h-5 w-5" />
          Receive your sticker
        </h3>
        <p className="text-sm text-muted-foreground">
          Rendering personalized sticker
        </p>
      <div className="flex flex-col justify-center items-center h-full gap-2">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full w-full gap-2">
            <Line percent={loadingProgress} />
            <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
          </div>
        ) : stickerResult ? (
          <img src={stickerResult} className="w-full mt-2" />
        ) : (
          <img src={stickerPlaceholder} className="w-full mt-2" />
        )}
      </div>
      </Card>
    </div>
  );
};

export default ImageGenOutput;
