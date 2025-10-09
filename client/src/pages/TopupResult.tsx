import { useSearchParams } from "react-router-dom";
import { useGetPaymentStatusQuery } from "../store/billing/billingApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";

import Card from "../components/Card";
const TopupResult = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [polling, setPolling] = useState(true);
  const { data, isFetching } = useGetPaymentStatusQuery(sessionId ?? "", {
    pollingInterval: 3000,
    skip: !sessionId || !polling,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === "completed" || data?.status === "cancel") {
      setPolling(false);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="h-[200px]">
          <Card>
            <h4 className="font-bold text-center">There was an error</h4>
            <h4 className="font-bold text-center">Please try again</h4>
            <div className="h-full flex items-center justify-center">
              <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (isFetching || data.status === "pending") {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="h-[200px]">
          <Card>
            <h4 className="font-bold text-center">Status:</h4>
            <h4 className="font-bold text-center">Processing Payment</h4>
            <div className="h-full flex items-center justify-center">
              <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (data.status === "cancel") {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="h-[200px]">
          <Card>
            <h4 className="font-bold text-center">Payment cancelled</h4>
            <div className="h-full flex items-center justify-center">
              <button
                className="min-w-[20px] flex rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-4  items-center pt-1 pb-1"
                onClick={() => navigate("/")}
              >
                Click here to return to the app
              </button>{" "}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (data.status === "completed") {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="h-[200px]">
          <Card>
            <h4 className="font-bold text-center">Payment successful</h4>
            <div className="h-full flex items-center justify-center">
              <button
                className="min-w-[20px] flex rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-4  items-center pt-1 pb-1"
                onClick={() => navigate("/")}
              >
                Click here to return to the app
              </button>{" "}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return <p>There was an error</p>;
};

export default TopupResult;