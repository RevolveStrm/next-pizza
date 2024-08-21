import Link from 'next/link';
import React from 'react';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from 'shared/components/ui/sheet';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { CartStateItem } from 'shared/lib/get-cart-details';
import { getCartItemDetails } from 'shared/lib/get-cart-item-details';
import { PizzaSize, PizzaType } from 'shared/constants/pizza';
import Image from 'next/image';
import { cn } from 'shared/lib/utils';
import { Title } from './title';
import { useCart } from 'shared/hooks';
import { calcCheckoutTotalPriceDetails } from 'shared/lib/calc-checkout-total-price';

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    const {
        totalAmount,
        items,
        updateItemQuantity,
        removeCartItem,
        loading
    } = useCart();
    const [redirecting, setRedirecting] = React.useState<boolean>(false);

    const handleClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

        if (newQuantity > 0) {
            updateItemQuantity(id, newQuantity);
        } else {
            removeCartItem(id);
        }
    };

    const checkoutTotalPriceDetails = calcCheckoutTotalPriceDetails(totalAmount);

    return (
        <Sheet>
            <SheetTrigger asChild >
                {children}
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                В корзині <span className="font-bold">{items.length} товари</span>
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image src="/assets/images/signs/empty-box.png" alt="Empty cart" width={120} height={120} />
                            <Title size="sm" text="Корзина пуста" className="text-center font-bold my-2" />
                            <p className="text-center text-neutral-500 mb-5">
                                Додайте хоча б одну піцу для оформлення замовлення
                            </p>

                            <SheetClose>
                                <Button className="w-56 h-12 text-base" size="lg">
                                    <ArrowLeft className="w-5 mr-2" />
                                    Повернутись назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {items.length > 0 && (
                        <div className='-mx-6 mt-5 flex-1 overflow-auto'>
                            {items?.length > 0 && items.map((item: CartStateItem) => (
                                <div className='mb-3' key={item.id}>
                                    <CartDrawerItem
                                        id={item.id}
                                        imageUrl={item.imageUrl}
                                        details={getCartItemDetails(
                                            item.ingredients,
                                            item.pizzaType as PizzaType,
                                            item.pizzaSize as PizzaSize,
                                        )}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        disabled={item.disabled}
                                        onClickCountButton={(type) => handleClickCountButton(
                                            item.id,
                                            item.quantity,
                                            type
                                        )}
                                        onClickRemove={() => removeCartItem(item.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <SheetFooter className="-mx-6 bg-white p-8">
                            <div className="w-full">
                                <div className="flex mb-4">
                                    <span className="flex flex-1 text-lg text-neutral-500">
                                        Загалом
                                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                    </span>

                                    <span className="font-bold text-lg">{totalAmount} ₴</span>
                                </div>

                                <Link href="/checkout">
                                    <Button
                                        onClick={() => {
                                            setRedirecting(true);
                                        }}
                                        loading={loading}
                                        disabled={loading || redirecting}
                                        type="submit"
                                        className="w-full h-12 text-base">
                                        Оформити замовлення
                                        <ArrowRight className="w-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </SheetFooter>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}