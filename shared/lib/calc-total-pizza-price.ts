import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "shared/constants/pizza";

/**
 * Function which calculates total prices of pizza and its size, type and chosen extra ingredients
 * @param type - pizza type 1 | 2
 * @param size - pizza size 20 | 30 | 40
 * @param items - product items
 * @param ingredients - product ingredients
 * @param selectedIngredients - selected extra ingredients by user
 * @returns total pizza price
 */

export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
): number | null => {
    const pizzaPrice: number | null = items?.find((item: ProductItem) => item?.size === size && item?.pizzaType === type)?.price ?? null;

    const totalIngredientPrice: number = ingredients
        ?.filter(((ingredient: Ingredient) => selectedIngredients.has(ingredient.id)))
        ?.reduce((acc, ingredient: Ingredient) => acc + ingredient.price, 0);

    return pizzaPrice ? pizzaPrice + totalIngredientPrice : null;
}