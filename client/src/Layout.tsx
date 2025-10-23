import { Outlet } from "react-router-dom";
import HeaderChakra from "./components/HeaderChakra";
import { domainUrl } from "./env";
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Layout = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }, [pathname])
    return null
  }

  return (
  <div style={{ maxWidth: "412px", margin: "0 auto" }}>
      <HeaderChakra />
      <ScrollToTop />
      <main>
        <Outlet context={{ domainUrl }}/>
      </main>
    </div>
  );
};

export default Layout;
