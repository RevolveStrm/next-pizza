import { Prisma } from '@prisma/client';

import { SIZE_TO_MAX_PRICE, SIZE_TO_MIN_PRICE } from './constants';

export const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const generateProductItem = ({
    productId,
    pizzaType,
    size,
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {
        productId,
        price: randomDecimalNumber(
            size ? SIZE_TO_MIN_PRICE[size] : 30,
            size ? SIZE_TO_MAX_PRICE[size] : 100,
        ),
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput;
};
