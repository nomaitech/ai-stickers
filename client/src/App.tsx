import { useDispatch, useSelector } from "react-redux";
import Route from "./routes/Route";
import { useEffect } from "react";
import type { RootState } from "./store";
import { userApi } from "./store/userInfo/userApi";
import { updateUserInfo } from "./store/UI/uiSlice";
import { Loader } from "lucide-react";

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
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    ) : (
      <Route />
    )
  );
}

export default App;
