import { useState } from "react";
import StickerView from "./StickerView";
import {
  useLazyListStickersFromPackQuery,
  useRenameStickerPackMutation,
} from "../store/stickers/stickerApi";

type StickerPack = {
  id: string;
  name: string;
  createdAt: string;
}

type Props = {
  pack: StickerPack;
  stickerPacks: StickerPack[];
};

const StickerPackView = ({ pack, stickerPacks }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(pack.name);
  const [fetchStickers, { data: stickers, isFetching }] =
    useLazyListStickersFromPackQuery();
  const [renameStickerPack] = useRenameStickerPackMutation();

  const handleClick = async () => {
    if (!expanded && !stickers) {
      fetchStickers(pack.id);
    }
    setExpanded(!expanded);
  };

  const handleSaveName = async () => {
    try {
      await renameStickerPack({ packId: pack.id, name }).unwrap();
      setEditingName(false);
    } catch (error) {
      console.error("Error renaming sticker pack:", error);
    }
  };

  return (
    <div className="p-3 border rounded">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleClick}
      >
        {editingName ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSaveName();
              }}
              className="bg-blue-500 text-white p-1 rounded"
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingName(false);
              }}
              className="bg-gray-300 p-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p>{name}</p>
        )}

        {!editingName && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingName(true);
            }}
            className="bg-gray-200 p-1 rounded"
          >
            Edit Name
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-2 pl-4">
          {isFetching ? (
            <p>Loading stickers...</p>
          ) : (
            !stickers ? (
              <p>No stickers in this pack</p> 
            ) :
            stickers?.map((sticker) => (
              <StickerView
                key={sticker.id}
                sticker={sticker}
                stickerPacks={stickerPacks}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StickerPackView;
