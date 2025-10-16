import { Outlet } from "react-router-dom";
import HeaderChakra from "./components/HeaderChakra";
import Register from "./components/Register";
import { Toaster } from "sonner";
import { domainUrl } from "./env";
import { useSelector } from "react-redux";
import type { RootState } from "../src/store";

const Layout = () => {
  const showRegister = useSelector((state: RootState) => state.ui.showRegister);

  return (
  <div className="min-h-screen flex flex-col">
      <HeaderChakra />
      <main className="flex-1 flex">
        <Outlet context={{ domainUrl }}/>
      </main>
      {showRegister && <Register />}
      <Toaster />
    </div>
  );
};

export default Layout;
