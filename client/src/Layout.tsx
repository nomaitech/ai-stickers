import { Outlet } from "react-router-dom";
import HeaderChakra from "./components/HeaderChakra";
import { domainUrl } from "./env";
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

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
