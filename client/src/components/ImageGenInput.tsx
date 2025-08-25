import Card from "../components/Card";
import { useState } from "react";
import { Image } from "lucide-react";
import ImageUploader from "./ImageUploader";
import { Emoji } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import './EmojiPicker.css';

type Props = {
  setImageFileHandler: (file: File) => void;
};

const ImageGenInput = ({ setImageFileHandler }: Props) => {
  const [emojiCode, setEmojiCode] = useState<string>("1f600");

  return (
    <div className="lg:min-h-660px flex-1">
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
          <span>SelectedEmoji: <Emoji unified={emojiCode} size={25} /></span>
          <EmojiPicker 
            open={true}
            onEmojiClick={(selectedEmoji) => setEmojiCode(selectedEmoji.unified)}
            skinTonesDisabled={true} 
            width="100%" 
            lazyLoadEmojis={true}
            previewConfig={{ showPreview: false }}
          />
        </div>
      </Card>
    </div>
  );
};

export default ImageGenInput;
