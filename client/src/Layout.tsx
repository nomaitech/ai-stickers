import { Outlet } from "react-router-dom";
import HeaderChakra from "./components/HeaderChakra";
import { domainUrl } from "./env";

const Layout = () => {
  return (
  <div className="min-h-screen flex flex-col">
      <HeaderChakra />
      <main className="flex-1 flex">
        <Outlet context={{ domainUrl }}/>
      </main>
    </div>
  );
};

export default Layout;
