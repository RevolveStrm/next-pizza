import { error } from 'console';

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from 'prisma/db';
import { updateCartTotalAmount } from 'shared/lib/update-cart-total-amount';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const id = Number(params.id);
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get('cart-token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.update({
            where: {
                id,
            },
            data: {
                quantity: data.quantity,
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (e) {
        console.error('[CART_PATCH] Server error', error);
        return NextResponse.json(
            { message: "Server error. Couldn't update a cart." },
            { status: 500 },
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const id = Number(params.id);
        const token = req.cookies.get('cart-token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.delete({
            where: {
                id,
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (e) {
        console.error('[CART_DELETE] Server error', error);
        return NextResponse.json(
            { message: "Server error. Couldn't delete an item from the cart." },
            { status: 500 },
        );
    }
}
