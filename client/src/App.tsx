import { useDispatch, useSelector } from "react-redux";
import Route from "./routes/Route";
import { useEffect } from "react";
import type { RootState } from "./store";
import { mainApi } from "@/store/mainApi"
import { updateUserInfo } from "./store/UI/uiSlice";
import { AbsoluteCenter, Spinner } from "@chakra-ui/react";
function App() {
  const token = useSelector((state: RootState) => state.auth.access_token);
  const dispatch = useDispatch();

  const { data: userInfo, isLoading } = mainApi.useGetUserInfoQuery(undefined, { skip: !token });
  useEffect(() => {
    if (userInfo) {
      dispatch(updateUserInfo(userInfo));
    }
  }, [userInfo, dispatch]);

  return (
    isLoading ? (
      <AbsoluteCenter>
        <Spinner size="xl" color="orange.300" mt={2} />
      </AbsoluteCenter>
    ) : (
      <Route />
    )
  );
}

export default App;
