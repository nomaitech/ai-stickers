import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import StickerView from "./StickerView";

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

type Props = { pack: StickerPack, stickerPacks: StickerPack[] };

const StickerPackView = ({ pack, stickerPacks }: Props) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(pack.name);

  const { domainUrl } = useOutletContext<{ domainUrl: string }>();

  const handleClick = async () => {
    if (!expanded) {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          `${domainUrl}/sticker-packs/${pack.id}/stickers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.ok) {
          const data: Sticker[] = await response.json();
          setStickers(data);
        }
      } catch (err) {
        console.error("Failed to load stickers", err);
      }
    }
    setExpanded(!expanded);
  };

  const handleSaveName = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${domainUrl}/sticker-packs/${pack.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to update name");
      setEditingName(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-3 border rounded">
      <div className="flex items-center justify-between cursor-pointer" onClick={handleClick}>
        {editingName ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1"
            />
            <button onClick={(e) => { e.stopPropagation(); handleSaveName(); }} className="bg-blue-500 text-white p-1 rounded">
              Save
            </button>
            <button onClick={(e) => { e.stopPropagation(); setEditingName(false); }} className="bg-gray-300 p-1 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <p>{name}</p>
        )}

        {!editingName && (
          <button
            onClick={(e) => { e.stopPropagation(); setEditingName(true); }}
            className="bg-gray-200 p-1 rounded"
          >
            Edit Name
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-2 pl-4">
          {stickers.length === 0 ? (
            <p>No stickers yet</p>
          ) : (
            stickers.map((sticker) => (
              <StickerView key={sticker.id} sticker={sticker} stickerPacks={stickerPacks} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StickerPackView;
