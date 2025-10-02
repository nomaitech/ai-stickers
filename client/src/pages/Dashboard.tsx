import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/index";
import {
  useGetStickersQuery,
  useListPacksQuery,
  useCreatePackMutation,
} from "../store/stickers/stickerApi";
import StickerPackView from "../components/StickerPacksView";
import StickerView from "../components/StickerView";

const Dashboard = () => {
  const [creating, setCreating] = useState(false);
  const [packName, setPackName] = useState("");
  const userEmail = useSelector((state: RootState) => state.ui.email);
  const userCredits = useSelector((state: RootState) => state.ui.credits);
  const [createPack] = useCreatePackMutation();
  const { data: stickerPacks /* isLoading, error */ } = useListPacksQuery();
  const { data: stickers } = useGetStickersQuery();

  const handleSave = () => {
    createPack({ name: packName }).unwrap();
    setCreating(false);
  };

  return (
    userEmail && (
      <div>
        <h1>Dashboard</h1>
        <p>Email: {userEmail}</p>
        <p>Credits: {userCredits}</p>
        <div>
          <h4>All stickers: </h4>
          {stickers?.map((sticker) => (
            <StickerView
              key={sticker.id}
              sticker={sticker}
              stickerPacks={stickerPacks}
            />
          ))}
          <h4>Sticker Packs: </h4>
          {!creating && (
            <button
              onClick={() => setCreating(true)}
                className="bg-blue-500 text-white p-1 rounded"
            >
              Create Stickerpack
            </button>
          )}
          {creating && (
            <div className="mt-2 p-2 border-t flex flex-col space-y-2">
              <label>
                Name:
                <input
                  type="text"
                  value={packName}
                  onChange={(e) => setPackName(e.target.value)}
                  className="ml-2 border p-1"
                />
              </label>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setCreating(false)}
                className="bg-gray-300 p-1 rounded"
              >
                Cancel
              </button>
            </div>
          )}
          {stickerPacks?.map((pack) => (
            <StickerPackView
              key={pack.id}
              pack={pack}
              stickerPacks={stickerPacks}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Dashboard;
