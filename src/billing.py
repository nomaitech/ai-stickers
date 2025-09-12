import os
import stripe

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

stripe_webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")


async def create_payment_session(payment_data, user_id):
    checkout_session = await stripe.checkout.Session.create_async(
        payment_method_types=["card"],
        line_items=[{"price": payment_data.price, "quantity": 1}],
        mode="payment",
        success_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/payments/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/payments/cancelled",
        metadata={
            "user_id": str(user_id),
        },
    )
    return checkout_session


def construct_event(payload, sig_header):
    return stripe.Webhook.construct_event(payload, sig_header, stripe_webhook_secret)
