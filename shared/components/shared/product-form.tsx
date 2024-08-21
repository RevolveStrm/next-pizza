'use client';

import { ProductItem } from '@prisma/client';
import React from 'react';
import toast from 'react-hot-toast';

import { useCartStore } from 'shared/store';
import { ProductWithRelations } from 'types/product';

import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
    product,
    onSubmit: _onSubmit,
}) => {
    const { cartLoading, addCartItem } = useCartStore((state) => ({
        addCartItem: state.addCartItem,
        cartLoading: state.loading,
    }));
    const firstProductItem: ProductItem = product.items?.[0];
    const isPizza: boolean = Boolean(firstProductItem?.pizzaType);

    const onSubmit = async (
        productItemId: number,
        ingredients: number[] = [],
    ) => {
        try {
            await addCartItem({
                productItemId,
                ingredients,
            });
            toast.success(`${product.name} було додано до корзини`);
        } catch (error) {
            toast.error(`Не вдалось додати товар до корзини`);
            console.error(error);
        }
    };

    if (isPizza) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                items={product.items}
                onSubmit={onSubmit}
                loading={cartLoading}
            />
        );
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstProductItem.price}
            onSubmit={() => onSubmit(firstProductItem.id)}
            loading={cartLoading}
        />
    );
};
