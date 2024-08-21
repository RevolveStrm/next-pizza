'use client';

import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useClickAway, useDebounce } from 'react-use';

import { cn } from '../../lib/utils';
import { API } from '../../services/api-client';

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [foundProducts, setFoundProducts] = React.useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const ref = useRef(null);

    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchQuery(e.target.value);
    };

    const handleItemLinkClick = () => {
        setFocused(false);
        setSearchQuery('');
        setFoundProducts([]);
    };

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        () => {
            if (searchQuery) {
                API.products
                    .search(searchQuery)
                    .then((data) => {
                        setFoundProducts(data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                setFoundProducts([]);
            }
        },
        500,
        [searchQuery],
    );

    return (
        <>
            {focused && (
                <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 z-30"></div>
            )}
            <div
                ref={ref}
                className={cn(
                    'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
                    className,
                )}
            >
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Знайти піцу..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => setFocused(true)}
                />

                {foundProducts.length > 0 && (
                    <div
                        className={cn(
                            'absolute w-full bg-white rounded-2xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                            focused && 'visible opacity-100 top-12',
                        )}
                    >
                        {foundProducts.map((product) => (
                            <div key={product.id}>
                                <Link
                                    onClick={handleItemLinkClick}
                                    href={`/product/${product.id}`}
                                    className="flex items-center gap-5 px-3 py-2 hover:bg-primary/10 cursor-pointer"
                                >
                                    <img
                                        className="rounded-sm"
                                        width={32}
                                        height={32}
                                        alt={product.name}
                                        src={product.imageUrl}
                                    />
                                    {product.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
