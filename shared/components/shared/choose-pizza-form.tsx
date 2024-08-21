'use client';

import { Ingredient, ProductItem } from '@prisma/client';
import React from 'react';

import { PizzaSize, PizzaType, pizzaTypes } from 'shared/constants/pizza';
import { usePizzaOptions } from 'shared/hooks';
import { getPizzaDetails } from 'shared/lib/get-pizza-details';
import { cn } from 'shared/lib/utils';

import { GroupVariants } from './group-variants';
import { IngredientItem } from './ingredient-item';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    loading,
    onSubmit,
    className,
}) => {
    const {
        size,
        type,
        availableSizes,
        selectedIngredients,
        currentItemId,
        setSize,
        setType,
        addIngredient,
    } = usePizzaOptions(items);

    const { totalPrice, textDetails } = getPizzaDetails(
        type,
        size,
        items,
        ingredients,
        selectedIngredients,
    );

    const handleClickAddToCart = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants
                        items={availableSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />

                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className="bg-gray-50 p-5 mt-5 rounded-md h-[420px] overflow-auto scrollbar">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients?.length > 0 &&
                            ingredients.map((ingredient: Ingredient) => (
                                <IngredientItem
                                    key={ingredient.id}
                                    imageUrl={ingredient.imageUrl}
                                    name={ingredient.name}
                                    price={ingredient.price}
                                    active={selectedIngredients.has(
                                        ingredient.id,
                                    )}
                                    onClick={() => addIngredient(ingredient.id)}
                                />
                            ))}
                    </div>
                </div>

                <Button
                    disabled={!totalPrice}
                    loading={loading}
                    onClick={handleClickAddToCart}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                >
                    {totalPrice
                        ? `Додати до корзини за ${totalPrice} ₴`
                        : 'Оберіть інший варіант'}
                </Button>
            </div>
        </div>
    );
};
