'use client';

import { ProductItem } from '@prisma/client';
import React from 'react';
import { useIntersection } from 'react-use';

import { cn } from 'shared/lib/utils';
import { ProductWithRelations } from 'types/product';

import { ProductCard } from './product-card';
import { Title } from './title';
import { useCategoryStore } from '../../store';

interface Props {
    title: string;
    products: ProductWithRelations[];
    categoryId: number;
    listClassName?: string;
    className?: string;
}

const STICKY_HEADER_HEIGHT: number = -125;

export const ProductsGroupList: React.FC<Props> = ({
    title,
    products,
    categoryId,
    listClassName,
    className,
}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.1,
    });

    React.useEffect(() => {
        const handleHashChange = () => {
            if (intersectionRef.current && window.location.hash) {
                const hash = decodeURIComponent(
                    window.location.hash.replace('#', ''),
                );
                const element = intersectionRef.current as HTMLDivElement;
                const elementY = element.getBoundingClientRect().top;

                if (element.id !== hash) {
                    return;
                }

                const y: number =
                    elementY + window.scrollY + STICKY_HEADER_HEIGHT;

                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        if (window.location.hash) {
            handleHashChange();
        }

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, title, intersection?.isIntersecting]);

    return (
        <div className={cn('', className)} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {products.map((product: ProductWithRelations) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={Math.min(
                            ...product?.items.map(
                                (item: ProductItem) => item.price,
                            ),
                        )}
                        imageUrl={product.imageUrl}
                        ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};
