import { useState } from "react";
import { useModifyStickerMutation } from "../store/stickers/stickerApi";

type StickerPack = {
  id: string;
  name: string;
  createdAt: string;
};

type Sticker = {
  id: string;
  generated_img_url: string;
  emoji: string;
};

type Props = {
  sticker: Sticker;
  stickerPacks?: StickerPack[];
};

const StickerView = ({ sticker, stickerPacks }: Props) => {
  const [editing, setEditing] = useState(false);
  const [emoji, setEmoji] = useState(sticker.emoji);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [modifySticker] = useModifyStickerMutation();

  const handleSave = async () => {
    try {
      await modifySticker({ stickerId: sticker.id, emoji, packId: selectedPack }).unwrap();
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col p-2 m-2 border rounded">
      <div
        onClick={() => setEditing(!editing)}
        className="cursor-pointer flex items-center justify-center space-x-2"
      >
        <span>Image: </span><img src={sticker.generated_img_url} alt={emoji} className="w-10 h-10" />
        <span>Associated emoji: </span><span>{emoji}</span>
      </div>

      {editing && (
        <div className="mt-2 p-2 border-t flex flex-col justify-center items-center space-y-2">
          <img src={sticker.generated_img_url} alt={emoji} className="w-32 h-32 mx-auto" />
          <label>
            Emoji:
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="ml-2 border p-1"
            />
          </label>

        {stickerPacks && 
          <label>
            Sticker Pack:
            <select
              value={selectedPack || ""}
              onChange={(e) => setSelectedPack(e.target.value)}
              className="ml-2 border p-1"
            >
              <option value="">Select pack</option>
              {stickerPacks.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name}
                </option>
              ))}
            </select>
          </label>
          }
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-1 rounded w-full"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-300 p-1 rounded w-full"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default StickerView;
