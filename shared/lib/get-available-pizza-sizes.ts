import { ProductItem } from '@prisma/client';

import { pizzaSizes, PizzaType } from 'shared/constants/pizza';

export const getAvailablePizzaSizes = (
    type: PizzaType,
    items: ProductItem[],
) => {
    const filteredItemsByPizzaType: ProductItem[] = items.filter(
        (item) => item.pizzaType === type,
    );
    return pizzaSizes.map((el) => ({
        ...el,
        disabled: !filteredItemsByPizzaType.find(
            (item: ProductItem) => item.size === Number(el.value),
        ),
    }));
};
