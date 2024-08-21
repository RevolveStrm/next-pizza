'use client';

import { ProductItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import { useCartStore } from 'shared/store';
import { ProductWithRelations } from 'types/product';

import { cn } from '../../../lib/utils';
import { Dialog, DialogContent } from '../../ui/dialog';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { ChooseProductForm } from '../choose-product-form';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter();
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
            router.back();
        } catch (error) {
            toast.error(`Не вдалось додати товар до корзини`);
            console.error(error);
        }
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}
            >
                {isPizza ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        items={product.items}
                        onSubmit={onSubmit}
                        loading={cartLoading}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={firstProductItem.price}
                        onSubmit={() => onSubmit(firstProductItem.id)}
                        loading={cartLoading}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
