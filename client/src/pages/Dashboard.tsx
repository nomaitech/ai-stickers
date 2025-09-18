import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import StickerPackView from "../components/StickerPacksView";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [stickerPacks, setStickerPacks] = useState<StickerPack[]>([]);

  type StickerPack = {
    id: string;
    name: string;
    createdAt: string;
  }
  const { domainUrl, credits } = useOutletContext<{
    updateCredits: () => void;
    domainUrl: string;
    credits: number;
    setCredits: (credits: number) => void;
  }>();

  const dashboardInfo = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(`${domainUrl}/user-info`, {
        headers: {
          method: "GET", 
          Authorization: `Bearer ${token}` 
        },
      });
      if (response.ok) {
        const { email } = await response.json();
        setEmail(email);
      } else {
        localStorage.removeItem("jwt");
      }
    } catch {
      localStorage.removeItem("jwt");
    }

    try{
      const response = await fetch(`${domainUrl}/sticker-packs`,{
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.ok){
        const stickerPacks = await response.json();
        setStickerPacks(stickerPacks);
      }
    } catch{
      console.log("error");
    }
  };

  useEffect(() => {
    dashboardInfo();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Email: {email}</p>
      <p>Credits: {credits}</p>
      <div>
        <h4>Sticker Packs</h4>
        {stickerPacks.map(pack => <StickerPackView key={pack.id} pack={pack} stickerPacks={stickerPacks}/>)}
      </div>
    </div>
  );
};

export default Dashboard;
