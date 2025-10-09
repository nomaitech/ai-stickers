import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import { Toaster } from "sonner";
import { domainUrl } from "./env";
import { useSelector } from "react-redux";
import type { RootState } from "../src/store";

const Layout = () => {
  const showRegister = useSelector((state: RootState) => state.ui.showRegister);

  return (
  <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <Outlet context={{ domainUrl }}/>
      </main>
      <Footer />
      {showRegister && <Register />}
      <Toaster />
    </div>
  );
};

export default Layout;
