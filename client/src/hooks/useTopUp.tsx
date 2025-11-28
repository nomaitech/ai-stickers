import { useDispatch } from "react-redux";
import { mainApi } from "@/store/mainApi";
import { useGetPaymentSessionMutation } from "@/store/mainApi";

const useTopUp = () => {
  const dispatch = useDispatch();
  const [getPaymentSession] = useGetPaymentSessionMutation();

  const topUp = async (priceId: string) => {
    dispatch(mainApi.util.invalidateTags(['PaymentStatus']))
    const result = await getPaymentSession({priceId}).unwrap();
    window.location.replace(result.checkout_url);
  };
  return topUp;
}

export default useTopUp;