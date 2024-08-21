'use client';

import { ArrowRight, ShoppingCart } from 'lucide-react';
import React from 'react';

import { cn } from 'shared/lib/utils';
import { useCartStore } from 'shared/store';

import { CartDrawer } from './cart-drawer';
import { Button } from '../ui';

interface Props {
    className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
    const { items, loading, totalAmount } = useCartStore((state) => ({
        items: state.items,
        loading: state.loading,
        totalAmount: state.totalAmount,
    }));

    return (
        <CartDrawer>
            <Button
                className={cn(
                    'group relative',
                    { 'w-[105px]': loading },
                    className,
                )}
                disabled={loading}
                loading={loading}
            >
                <b>{totalAmount} ₴</b>
                <span className="h-full w-[1px] bg-white/30 mx-3"></span>
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart
                        size={16}
                        className="relative"
                        strokeWidth={2}
                    />
                    <b>{items.length}</b>
                </div>
                <ArrowRight
                    size={20}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    );
};
