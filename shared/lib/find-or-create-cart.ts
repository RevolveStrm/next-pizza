import { Cart } from "@prisma/client";
import { prisma } from "prisma/db";

export const findOrCreateCart = async (token: string): Promise<Cart> => {
    let cart: Cart | null = await prisma.cart.findFirst({
        where: {
            token
        }
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                token
            }
        });
    }

    return cart;
};