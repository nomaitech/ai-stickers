import { useDispatch } from "react-redux";
import { billingApi } from "../store/billing/billingApi";
import { useGetPaymentSessionMutation } from "../store/billing/billingApi";

const useTopUp = () => {
  const dispatch = useDispatch();
  const [getPaymentSession] = useGetPaymentSessionMutation();

  const topUp = async () => {
    dispatch(billingApi.util.resetApiState());
    const result = await getPaymentSession().unwrap();
    window.location.replace(result.checkout_url);
  };
  return topUp;
}

export default useTopUp;