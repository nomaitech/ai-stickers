import { useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { useGetStickersQuery, useListPacksQuery } from "../store/stickers/stickerApi";
import StickerPackView from "../components/StickerPacksView";
import StickerView from "../components/StickerView";

const Dashboard = () => {
  const userEmail = useSelector((state: RootState) => state.ui.email);
  const userCredits = useSelector((state: RootState) => state.ui.credits);
  const { data: stickerPacks, /* isLoading, error */ } = useListPacksQuery();
  const { data: stickers } = useGetStickersQuery();
  return (
    userEmail &&
    (
    <div>
      <h1>Dashboard</h1>
      <p>Email: {userEmail}</p>
      <p>Credits: {userCredits}</p>
      <div>
        <h4>All stickers: </h4>
        {stickers?.map((sticker) => (
          <StickerView key={sticker.id} sticker={sticker} stickerPacks={stickerPacks} />
        ))
        }
        <h4>Sticker Packs: </h4>
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
