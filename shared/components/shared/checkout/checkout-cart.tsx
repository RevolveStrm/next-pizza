import React from 'react';
import Image from 'next/image';
import { WhiteBlock } from '../white-block';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';
import { CheckoutItem } from '../checkout-item';
import { CartStateItem } from 'shared/lib/get-cart-details';
import { getCartItemDetails } from 'shared/lib/get-cart-item-details';
import { PizzaSize, PizzaType } from 'shared/constants/pizza';
import { Title } from '../title';

interface Props {
    items: CartStateItem[];
    loading?: boolean;
    className?: string;
    handleItemCount: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    handleItemRemove: (id: number) => void;
}

const SKELETON_ITEMS_COUNT = 3;

export const CheckoutCart: React.FC<Props> = ({ items, loading, handleItemCount, handleItemRemove, className }) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading ?
                    [...Array(items?.length || SKELETON_ITEMS_COUNT)].map((_, index) => (
                        <CheckoutItemSkeleton key={index} />
                    )) :
                    items?.length > 0 ? items?.map((item) => (
                        <CheckoutItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            quantity={item.quantity}
                            details={getCartItemDetails(
                                item.ingredients,
                                item.pizzaType as PizzaType,
                                item.pizzaSize as PizzaSize,
                            )}
                            disabled={item.disabled}
                            onClickCountButton={(type) => handleItemCount(
                                item.id,
                                item.quantity,
                                type
                            )}
                            onClickRemove={() => handleItemRemove(item.id)}
                        />
                    )) :
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image src="/assets/images/signs/empty-box.png" alt="Empty cart" width={120} height={120} />
                            <Title size="sm" text="Корзина пуста" className="text-center font-bold my-2" />
                            <p className="text-center text-neutral-500 mb-5">
                                Додайте хоча б одну піцу для оформлення замовлення
                            </p>
                        </div>
                }
            </div>
        </WhiteBlock>
    );
}