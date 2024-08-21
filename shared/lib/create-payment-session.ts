import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export type CreateCheckoutSessionParams = {
    amount: number;
    currency: string;
    orderId: number;
    successUrl: string;
    cancelUrl: string;
};

export const createCheckoutSession = async ({
    amount,
    currency,
    orderId,
    successUrl,
    cancelUrl,
}: CreateCheckoutSessionParams): Promise<Stripe.Checkout.Session> => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: currency || 'usd',
                    product_data: {
                        name: `Order #${orderId}`,
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        metadata: { orderId: orderId.toString() },
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
    });

    return session;
};
