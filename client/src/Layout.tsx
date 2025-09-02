import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import { Toaster } from "sonner";
import { domainUrl } from "../constants/env";

const Layout = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

    const logout = () => {
    localStorage.removeItem("jwt");
    setCredits(null);
  };

  const updateCredits = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(`${domainUrl}/credits`, {
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
        logout={logout}
        showRegister={() => setShowRegister(true)}
      />
      <main className="flex-1 flex bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <Outlet context={{ credits, setCredits, updateCredits, domainUrl }}/>
      </main>
      <Footer />
      {showRegister && <Register hideRegister={() => setShowRegister(false)} />}
      <Toaster />
    </div>
  );
};

export default Layout;
