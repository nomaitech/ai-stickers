import { useDispatch, useSelector } from "react-redux";
import Route from "./routes/Route";
import { useEffect } from "react";
import type { RootState } from "./store";
import { userApi } from "./store/userInfo/userApi";
import { updateUserInfo } from "./store/UI/uiSlice";
import { Loader } from "lucide-react";
import { AbsoluteCenter, Icon } from "@chakra-ui/react";
function App() {
  const token = useSelector((state: RootState) => state.auth.access_token);
  const dispatch = useDispatch();
  
  const { data: userInfo, isLoading } = userApi.useGetUserInfoQuery(undefined, { skip: !token });
  useEffect(() => {
    if (userInfo) {
      dispatch(updateUserInfo(userInfo));
    }
  }, [userInfo, dispatch]);

  return (
    isLoading ? (
      <AbsoluteCenter>
        <Icon color="primary" w={8} h={8} mt={12} animation="spin 1s linear infinite"><Loader /></Icon>
      </AbsoluteCenter>
    ) : (
      <Route />
    )
  );
}

export default App;
