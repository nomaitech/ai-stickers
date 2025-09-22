import type { RootState } from "./store/index";
import Route from "./routes/Route";
import { useSelector } from "react-redux";
import { userApi } from "./store/userInfo/userApi";
import { useEffect } from "react";

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [triggerGetUserInfo] = userApi.useLazyGetUserInfoQuery();

  useEffect(() => {
    if (token) {
      triggerGetUserInfo();
    }
  }, [token, triggerGetUserInfo]);

  return (
    <>
      <Route />
    </>
  );
}

export default App;
