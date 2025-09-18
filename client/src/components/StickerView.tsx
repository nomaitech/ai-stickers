import { useState } from "react";

interface StickerPack {
  id: string;
  name: string;
  createdAt: string;
}

interface Sticker {
  id: string;
  image: string;
  emoji: string;
}

type Props = { sticker: Sticker, stickerPacks: StickerPack[] };

const StickerView = ({ sticker, stickerPacks }: Props) => {
  const [editing, setEditing] = useState(false);
  const [emoji, setEmoji] = useState(sticker.emoji);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

  const handleSave = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`/stickers/${sticker.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emoji, packId: selectedPack }),
      });
      if (!response.ok) throw new Error("Update failed");
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col p-2 border rounded">
      <div onClick={() => setEditing(!editing)} className="cursor-pointer flex items-center space-x-2">
        <img src={sticker.image} alt={emoji} className="w-10 h-10" />
        <span>{emoji}</span>
      </div>

      {editing && (
        <div className="mt-2 p-2 border-t flex flex-col space-y-2">
          <img src={sticker.image} alt={emoji} className="w-32 h-32 mx-auto" />
          
          <label>
            Emoji:
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="ml-2 border p-1"
            />
          </label>

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

          <button onClick={handleSave} className="bg-blue-500 text-white p-1 rounded">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="bg-gray-300 p-1 rounded">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default StickerView;
