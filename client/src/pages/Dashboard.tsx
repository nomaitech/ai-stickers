import { useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { useListPacksQuery } from "../store/stickers/stickerApi";
import StickerPackView from "../components/StickerPacksView";

const Dashboard = () => {
  const userEmail = useSelector((state: RootState) => state.ui.email);
  const userCredits = useSelector((state: RootState) => state.ui.credits);
  const { data: stickerPacks, /* isLoading, error */ } = useListPacksQuery();

  return (
    userEmail &&
    (
    <div>
      <h1>Dashboard</h1>
      <p>Email: {userEmail}</p>
      <p>Credits: {userCredits}</p>
      <div>
        <h4>Sticker Packs</h4>
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
