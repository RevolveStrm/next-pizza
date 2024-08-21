import { prisma } from "prisma/db";
import { arraysEqual } from "./arrays-equal";

export const findSimiliarCartItem = async (cartId: number, productItemId: number, ingredients?: number[]) => {
    if (!Number.isFinite(cartId) || !Number.isFinite(productItemId)) {
        return;
    }

    const findCartItems = await prisma.cartItem.findMany({
        where: {
            cartId,
            productItemId,
            ...(ingredients?.length ? {
                ingredients: {
                    every: {
                        id: {
                            in: ingredients
                        }
                    }
                }
            } : {})
        },
        include: {
            ingredients: true
        }
    });

    if (ingredients?.length) {
        return findCartItems.find(el => arraysEqual<number>(el.ingredients.map((ingredient) => ingredient.id), ingredients));
    } else {
        return findCartItems.find(el => !el.ingredients?.length);
    }
}