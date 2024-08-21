import { Cart } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "prisma/db";
import crypto from "crypto";
import { findOrCreateCart } from "shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "shared/lib/update-cart-total-amount";
import { ingredients } from "prisma/constants";
import { findSimiliarCartItem } from "shared/lib/find-similiar-cart-item";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cart-token')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart: Cart | null = await prisma.cart.findFirst({
            where: {
                token
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true
                            }
                        },
                        ingredients: true
                    }
                }
            }
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.error('[CART_GET] Server error', error);
        return NextResponse.json({ message: 'Server error. Couldn\'t get a cart.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as CreateCartItemValues;
        let token = req.cookies.get('cart-token')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const cart: Cart = await findOrCreateCart(token);

        const similiarCartItem = await findSimiliarCartItem(cart.id, data.productItemId, data.ingredients);

        console.log(data.ingredients, similiarCartItem);

        if (similiarCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: similiarCartItem.id
                },
                data: {
                    quantity: similiarCartItem.quantity + 1
                }
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: {
                        connect: data.ingredients?.map((ingredientId) => ({ id: ingredientId }))
                    },
                }
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const response = NextResponse.json(updatedUserCart);

        response.cookies.set('cart-token', token);

        return response;
    } catch (error) {
        console.error('[CART_POST] Server error', error);
        return NextResponse.json({ message: 'Server error. Couldn\'t create a cart.' }, { status: 500 });
    }
}