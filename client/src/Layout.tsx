import { Outlet } from "react-router-dom";
import HeaderChakra from "./components/HeaderChakra";
import { domainUrl } from "./env";

const Layout = () => {
  return (
  <div style={{ maxWidth: "412px", margin: "0 auto" }}>
      <HeaderChakra />
      <main>
        <Outlet context={{ domainUrl }}/>
      </main>
    </div>
  );
};

export default Layout;
