import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { prisma } from 'prisma/db';
import { OrderSuccessTemplate } from 'shared/components/shared';
import { createRawBody } from 'shared/lib/create-raw-body';
import { sendEmail } from 'shared/lib/send-email';
import { CartItemDTO } from 'shared/services/dto/cart.dto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const signature: string | null = req.headers.get('stripe-signature');

        const rawBody: Buffer = await createRawBody(
            req.body as ReadableStream<Uint8Array>,
        );

        if (!rawBody || !signature) {
            throw new Error(
                "Couldn't get signature or raw body while parsing webhook",
            );
        }

        const event: Stripe.Event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string,
        );

        if (
            event.type === 'checkout.session.completed' &&
            event.data.object.id
        ) {
            const checkoutSessionEvent =
                event as Stripe.CheckoutSessionCompletedEvent;
            const paymentStatus: string =
                checkoutSessionEvent.data.object.payment_status;
            const paymentId: string = checkoutSessionEvent.data.object.id;

            const orderStatus: OrderStatus =
                paymentStatus === 'paid'
                    ? OrderStatus.SUCCEEDED
                    : OrderStatus.CANCELLED;

            const order = await prisma.order.findFirst({
                where: {
                    paymentId,
                },
            });

            if (order) {
                await prisma.order.update({
                    where: {
                        id: order.id,
                    },
                    data: {
                        status: orderStatus,
                    },
                });

                if (orderStatus === OrderStatus.SUCCEEDED) {
                    await sendEmail(
                        order.email,
                        'Next Pizza / Замовлення успішно оформлено',
                        OrderSuccessTemplate({
                            orderId: order?.id,
                            items: JSON.parse(
                                order?.items as string,
                            ) as CartItemDTO[],
                        }),
                    );
                }
            }
        }

        return NextResponse.json(
            { message: 'Server Handled' },
            { status: 200 },
        );
    } catch (error) {
        console.error('[STRIPE_EVENTS_ERROR]', error);
        return NextResponse.json({ message: 'Server Error' });
    }
}
