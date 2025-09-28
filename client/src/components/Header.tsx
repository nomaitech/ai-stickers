import { Brush, ArrowBigUpDash } from "lucide-react";
// import { toast } from "sonner";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/auth/authSlice";
import { updateCredits, updateEmail } from "../store/UI/uiSlice";
import type { RootState } from "../store/index";
import { userApi } from "../store/userInfo/userApi";
import { billingApi } from "../store/billing/billingApi";
import { useGetPaymentSessionMutation } from "../store/billing/billingApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [getPaymentSession] = useGetPaymentSessionMutation();
  const dispatch = useDispatch();
  const credits = useSelector((state: RootState) => state.ui.credits);
  const logout = () =>{
    dispatch(removeToken());
    dispatch(updateCredits(null));
    dispatch(updateEmail(null));
    dispatch(userApi.util.resetApiState());
  }
  
  const topUp = async () => {
    dispatch(billingApi.util.resetApiState());
    const result = await getPaymentSession().unwrap();
    window.open(result.checkout_url, "_blank");
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
          {credits !== null ? (
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
              <button
                className="min-w-[20px] flex rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-4  items-center pt-1 pb-1"
                onClick={topUp}
              >
                Top up
                <ArrowBigUpDash className="w-5 h-5" />
              </button>
              <span className="cursor-pointer" onClick={() => navigate("/dashboard")}>D A S H B O A R D</span>
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
