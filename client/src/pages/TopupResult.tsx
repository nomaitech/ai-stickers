import { useSearchParams } from "react-router-dom";
import { useGetPaymentStatusQuery } from "../store/billing/billingApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TopupResult = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [polling, setPolling] = useState(true);
  const { data, isFetching } = useGetPaymentStatusQuery(sessionId ?? "", { 
    pollingInterval: polling ? 3000 : 0, 
    skip: !sessionId, 
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === "completed" || data?.status === "cancel") {
      setPolling(false);
    }
  }, [data]);

  if (isFetching) {
    return <p>Pending...</p>;
  }

  if (!data) {
    return <p>Unknown payment state</p>;
  }

  if (data.status === "cancel") {
    return (
      <>
        <p>Payment cancelled</p>
        <span onClick={() => navigate("/")}>Click here to return to the app</span>
      </>
    );
  }

  if (data.status === "completed") {
    return (
      <>
        <p>Payment successful</p>
        <p className="cursor-pointer" onClick={() => navigate("/")}>Click here to return to the app</p>
      </>
    );
  }

  return <p>Unknown payment state</p>;
};

export default TopupResult;