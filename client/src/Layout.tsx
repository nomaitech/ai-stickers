import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import { Toaster } from "sonner";
import { domainUrl } from "../constants/env";
import { useSelector } from "react-redux";
import type { RootState } from "../src/store";

const Layout = () => {
  const [credits, setCredits] = useState<number | null>(null);
  const showRegister = useSelector((state: RootState) => state.ui.showRegister);

  const updateCredits = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    try {
      const response = await fetch(`${domainUrl}/user-info`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const { credits } = await response.json();
        setCredits(credits);
      } else {
        localStorage.removeItem("jwt");
      }
    } catch {
      localStorage.removeItem("jwt");
    }
  };

    useEffect(() => {
    updateCredits();
  }, []);

  return (
  <div className="min-h-screen flex flex-col">
      <Header
        credits={credits}
        updateCredits={updateCredits}
      />
      <main className="flex-1 flex bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <Outlet context={{ credits, setCredits, updateCredits, domainUrl }}/>
      </main>
      <Footer />
      {showRegister && <Register />}
      <Toaster />
    </div>
  );
};

export default Layout;
