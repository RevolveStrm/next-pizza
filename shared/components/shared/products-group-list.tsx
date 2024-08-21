'use client';

import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '../../store';
import { Product, ProductItem } from '@prisma/client';
import { cn } from 'shared/lib/utils';
import { ProductWithRelations } from 'types/product';

interface Props {
    title: string;
    products: ProductWithRelations[];
    categoryId: number;
    listClassName?: string;
    className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    products,
    categoryId,
    listClassName,
    className,
}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, title, intersection?.isIntersecting]);

    return (
        <div className={cn(className)} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    products.map((product: ProductWithRelations) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={Math.min(...product?.items.map((item: ProductItem) => item.price))}
                            imageUrl={product.imageUrl}
                            ingredients={product.ingredients}
                        />
                    ))
                }
            </div>
        </div>
    );
}