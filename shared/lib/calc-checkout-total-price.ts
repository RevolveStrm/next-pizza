import { DELIVERY_VALUE } from 'shared/constants/delivery-rate';
import { VAT_RATE } from 'shared/constants/vat';

export type CheckoutTotalPriceDetails = {
    vatPrice: number;
    itemsPrice: number;
    deliveryPrice: number;
    totalPrice: number;
};

export const calcCheckoutTotalPriceDetails = (itemsPrice: number) => {
    const deliveryPrice = DELIVERY_VALUE;
    const vatPrice = formatToFloat((itemsPrice / 100) * VAT_RATE);
    const totalPrice = formatToFloat(itemsPrice);

    return {
        vatPrice,
        itemsPrice,
        deliveryPrice,
        totalPrice,
    };
};

const formatToFloat = (price: number): number => {
    if (!price) {
        return 0;
    }
    return !Number.isInteger(price) ? Number(price.toFixed(2)) : price;
};
