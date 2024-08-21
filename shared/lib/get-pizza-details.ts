import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaSize, mapPizzaType } from '../constants/pizza';

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice: number | null = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
    const textDetails: string = `${mapPizzaSize[size]} ${size} см, ${mapPizzaType[type]} піца, інгредієнти (${selectedIngredients.size})`;;

    return { totalPrice, textDetails };
};