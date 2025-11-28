import { useLocation, useSearchParams } from "react-router-dom";
import { useGetPaymentStatusQuery } from "../store/mainApi";
import { useState, useEffect } from "react";
import { EmptyState, VStack } from "@chakra-ui/react"
import ProcessingPayment from "@/components/ProcessingPayment";
import PaymentSuccessful from "@/components/PaymentSuccessful";
import PaymentFailed from "@/components/PaymentFailed";
const TopupResult = () => {
    const location = useLocation();
    const isCancelled = location.pathname.endsWith("/cancelled");
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [polling, setPolling] = useState(true);
    const { data, isFetching } = useGetPaymentStatusQuery(sessionId ?? "", {
        pollingInterval: polling ? 3000 : 0,
        skip: !sessionId,
    });

    useEffect(() => {
        if (data?.status === "completed" || data?.status === "cancel") {
            setPolling(false);
        }
    }, [data]);

    if(isCancelled) return <PaymentFailed />

    if (isFetching) {
        return (
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                        <EmptyState.Title>Retrieving info...</EmptyState.Title>
                        <EmptyState.Description>
                            Retrieving info...
                        </EmptyState.Description>
                    </VStack>
                </EmptyState.Content>
            </EmptyState.Root>
        );
    }

    if (!data) {
        return (
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                        <EmptyState.Title>Unknown Payment State</EmptyState.Title>
                        <EmptyState.Description>
                            Retrieving info...
                        </EmptyState.Description>
                    </VStack>
                </EmptyState.Content>
            </EmptyState.Root>
        );
    }

    if (data.status === "pending") {
        return <ProcessingPayment />
    }

    if (data.status === "cancel") {
        return <PaymentFailed />
    }

    if (data.status === "completed") {
        return <PaymentSuccessful />
    }

    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>Unknown Payment State</EmptyState.Title>
                    <EmptyState.Description>
                        Retrieving info...
                    </EmptyState.Description>
                </VStack>
            </EmptyState.Content>
        </EmptyState.Root>
    );
};

export default TopupResult;