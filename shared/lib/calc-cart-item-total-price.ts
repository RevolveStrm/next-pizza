import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice: number = item.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0,
    );

    return (ingredientsPrice + item.productItem.price) * item.quantity;
};
