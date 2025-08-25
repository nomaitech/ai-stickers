import Card from "../components/Card";
import { Image } from "lucide-react";
import ImageUploader from "./ImageUploader";

type Props = {
  setImageFileHandler: (file: File) => void;
};

const ImageGenInput = ({
  setImageFileHandler,
}: Props) => {
  return (
    <div className="lg:min-h-[665px] flex-1">
      <Card>
        <div className="h-full flex flex-col">
          <h3 className="flex items-center gap-2 text-lg text-green-700">
            <Image className="h-5 w-5" />
            Upload your image
          </h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop your image here
          </p>
            <ImageUploader setImageFileHandler={setImageFileHandler} />
        </div>
      </Card>
    </div>
  );
};

export default ImageGenInput;
