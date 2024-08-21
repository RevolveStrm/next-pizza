import { Ingredient, ProductItem } from '@prisma/client';
import React from 'react';
import { useSet } from 'react-use';

import { Variant } from 'shared/components/shared/group-variants';
import { PizzaSize, PizzaType } from 'shared/constants/pizza';
import { getAvailablePizzaSizes } from 'shared/lib/get-available-pizza-sizes';

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    currentItemId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const defaultPizza = items.find(
        (item: ProductItem) => item.size && item.pizzaType,
    );

    const [size, setSize] = React.useState<PizzaSize>(
        (defaultPizza?.size || 20) as PizzaSize,
    );
    const [type, setType] = React.useState<PizzaType>(
        (defaultPizza?.pizzaType || 1) as PizzaType,
    );
    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([]),
    );

    const availableSizes = getAvailablePizzaSizes(type, items);

    const currentItemId = items.find(
        (item) => item.pizzaType === type && item.size === size,
    )?.id;

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled,
        );
        const availableSize = availableSizes?.find((item) => !item.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentItemId,
        setSize,
        setType,
        addIngredient,
    };
};
