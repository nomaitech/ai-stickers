import { Outlet } from "react-router-dom";
import HeaderChakra from "./components/HeaderChakra";
import { domainUrl } from "./env";
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
const Layout = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }, [pathname])
    return null
  }

  return (
    <Box maxWidth="100vw" sm={{ maxWidth: "412px" }} m="0 auto">
      <HeaderChakra />
      <ScrollToTop />
      <Toaster />
      <main>
        <Outlet context={{ domainUrl }}/>
      </main>
    </Box>
  );
};

export default Layout;
