import Card from "./Card";
import { Sticker, LoaderCircle } from "lucide-react";
import stickerPlaceholder from "../assets/stickerPlaceholder.png";

type Props = {
  isLoading: boolean;
  stickerResult: string | null;
};

const ImageGenOutput = ({ isLoading, stickerResult }: Props) => {
  return (
    <div className="lg:min-h-660px flex-1">
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
  );
};

export default ImageGenOutput;
