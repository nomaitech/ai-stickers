import { Outlet } from "react-router-dom";
import HeaderChakra from "./components/HeaderChakra";
import { Toaster } from "sonner";
import { domainUrl } from "./env";

const Layout = () => {
  return (
  <div className="min-h-screen flex flex-col">
      <HeaderChakra />
      <main className="flex-1 flex">
        <Outlet context={{ domainUrl }}/>
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
