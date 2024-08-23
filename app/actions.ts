'use server';

import { OrderStatus, User, UserRole } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

import { prisma } from 'prisma/db';
import { OrderPaymentTemplate } from 'shared/components/shared';
import { VerificationCodeTemplate } from 'shared/components/shared/email-templates/verification-code';
import { CheckoutFormFields } from 'shared/constants/checkout-form-schema';
import { createCheckoutSession } from 'shared/lib/create-payment-session';
import { generateVerificationCode } from 'shared/lib/generate-verification-code';
import { getSessionUser } from 'shared/lib/get-session-user';
import { sendEmail } from 'shared/lib/send-email';

export type RegisterUserDTO = Pick<User, 'email' | 'fullName' | 'password'>;

export type UpdateUserDTO = Pick<User, 'email' | 'fullName' | 'password'>;

export async function createOrder(
    data: CheckoutFormFields,
): Promise<string | undefined> {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cart-token')?.value;

        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token: cartToken,
            },
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        if (!userCart) {
            throw new Error('User cart not found');
        }

        if (userCart.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        if (!order) {
            throw new Error("Couldn't create an order");
        }

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        const checkoutSession = await createCheckoutSession({
            amount: order.totalAmount * 100,
            orderId: order.id,
            currency: 'uah',
            successUrl: process.env.PAYMENT_CALLBACK_SUCCESS_URL as string,
            cancelUrl: process.env.PAYMENT_CALLBACK_CANCEL_URL as string,
        });

        if (!checkoutSession) {
            throw new Error("Couldn't get a checkout session data");
        }

        if (!checkoutSession?.url) {
            throw new Error("Couldn't get a checkout session url");
        }

        if (!checkoutSession?.id) {
            throw new Error("Couldn't get a checkout session id");
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: checkoutSession?.id,
            },
        });

        await sendEmail(
            data.email,
            'Next Pizza / Нове замовлення',
            OrderPaymentTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: checkoutSession?.url,
            }),
        );

        return checkoutSession.url;
    } catch (error) {
        console.error('Error [CREATE_ORDER]', error);
        throw error;
    }
}

export async function registerUser(data: RegisterUserDTO) {
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (findUser) {
            throw new Error('User already exists');
        }

        const createdUser = await prisma.user.create({
            data: {
                email: data.email,
                fullName: data.fullName,
                password: hashSync(data.password, 10),
                role: UserRole.USER,
            },
        });

        const code = generateVerificationCode();

        await prisma.verificationCode.create({
            data: {
                userId: createdUser.id,
                code,
            },
        });

        const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify?code=${code}`;

        await sendEmail(
            createdUser.email,
            'Код підтвердження',
            VerificationCodeTemplate({ verificationUrl }),
        );
    } catch (error) {
        console.error('Error [REGISTER_USER]', error);
        throw error;
    }
}

export async function updateUser(data: UpdateUserDTO) {
    try {
        const sessionUser = await getSessionUser();

        if (!sessionUser) {
            throw new Error("Didn't found user in current session");
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(sessionUser.id),
            },
        });

        if (!findUser) {
            throw new Error("User doesn't exist");
        }

        await prisma.user.update({
            where: {
                id: Number(sessionUser.id),
            },
            data: {
                email: data.email,
                fullName: data.fullName,
                ...(data.password.length && {
                    password: hashSync(data.password, 10),
                }),
            },
        });
    } catch (error) {
        console.error('Error [UPDATE_USER]', error);
        throw error;
    }
}
