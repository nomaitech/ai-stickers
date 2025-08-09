import Card from "../components/Card";
import { Image, Pen } from "lucide-react";
import ImageUploader from "./ImageUploader";

type Props = {
  setImageFileHandler: (file: File) => void;
  promptInputText: string;
  setPromptInputText: (value: string) => void;
};

const ImageGenInput = ({
  setImageFileHandler,
  promptInputText,
  setPromptInputText,
}: Props) => {
  return (
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
  );
};

export default ImageGenInput;
