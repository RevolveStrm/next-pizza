import { Ingredient } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { ingredients } from 'prisma/constants';
import { cn } from 'shared/lib/utils';

import { Title } from './title';
import { Button } from '../ui';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
    ingredients?: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({
    id,
    name,
    price,
    imageUrl,
    ingredients,
    className,
}) => {
    return (
        <div
            className={cn(
                'flex flex-col justify-center items-center',
                className,
            )}
        >
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <img
                        className="w-[215px] h-[215px]"
                        src={imageUrl}
                        alt={name}
                    />
                </div>

                <Title className="mb-4 mt-4 font-bold" size="sm" text={name} />

                <p className="text-sm text-gray-400">
                    {ingredients
                        ? ingredients
                              ?.map(
                                  (ingredient: Ingredient, index) =>
                                      `${!index ? ingredient.name : ingredient.name.toLowerCase()}`,
                              )
                              .join(', ')
                        : ''}
                </p>

                <div className="flex justify-between items-center mt-5">
                    <span className="text-[20px]">
                        від <b>{price} ₴</b>
                    </span>

                    <Button variant="secondary" className="text-base font-bold">
                        <Plus size={20} className="mr-1" />
                        Додати
                    </Button>
                </div>
            </Link>
        </div>
    );
};
