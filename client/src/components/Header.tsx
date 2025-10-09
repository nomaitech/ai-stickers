import { Brush, ArrowBigUpDash, Folder } from "lucide-react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/auth/authSlice";
import { resetUserInfo } from "../store/UI/uiSlice";
import { userApi } from "../store/userInfo/userApi";
import { billingApi } from "../store/billing/billingApi";
import { useGetPaymentSessionMutation } from "../store/billing/billingApi";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.ui.userInfo);

  const [getPaymentSession] = useGetPaymentSessionMutation();
    
  const credits = userInfo?.credits;

  const logout = () =>{
    dispatch(removeToken());
    dispatch(resetUserInfo());
    dispatch(userApi.util.resetApiState());
  }
  
  const topUp = async () => {
    dispatch(billingApi.util.resetApiState());
    const result = await getPaymentSession().unwrap();
    window.location.replace(result.checkout_url)
  };

  return (
    <div className="border-b-1 border-border bg-white/50 backdrop-blur-sm">
      <div className="relative container mx-auto px-6 py-6">
      <div className="flex items-center gap-3 max-w-[100px] sm:max-w-[300px] cursor-pointer" onClick={() => navigate("/")}>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brush className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-primary">GenSticker</h1>
            <p className="text-sm text-gray-500">
              Generate personalized Telegram stickers
            </p>
          </div>
        </div>
        <div className="absolute top-1/2 right-6 lg:block transform -translate-y-1/2">
          {credits != undefined ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-semibold text-muted-foreground">
                You have <span className="text-primary">{credits}</span> credits
                left. (
                <span
                  className="cursor-pointer text-destructive"
                  onClick={() => logout()}
                >
                  Logout
                </span>
                )
              </p>
              <div className="flex gap-2">
              <button
                className="min-w-[20px] flex rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-4 items-center pt-1 pb-1"
                onClick={topUp}
              >
                Top up
                <ArrowBigUpDash className="w-5 h-5" />
              </button>
                            <button
                className="min-w-[20px] flex rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-4 items-center pt-1 pb-1 mr-1"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
                <Folder className="w-5 h-5" />
              </button>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
