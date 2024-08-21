'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

export interface PriceRange {
    priceFrom?: number;
    priceTo?: number;
}

export enum PriceRangeValues {
    MIN_PRICE_FROM = 0,
    MAX_PRICE_TO = 1000,
}

export interface Filters {
    selectedPrices: PriceRange;
    selectedTypes: Set<string>;
    selectedSizes: Set<string>;
    selectedIngredients: Set<string>;
}

export interface ReturnProps extends Filters {
    toggleSelectedType: (id: string) => void;
    toggleSelectedSize: (id: string) => void;
    toggleSelectedIngredient: (id: string) => void;
    handlePriceChange: (name: keyof PriceRange, value: number) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams();

    const [selectedPrices, setPrices] = React.useState<PriceRange>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });
    const [selectedTypes, { toggle: toggleSelectedType }] = useSet(
        new Set<string>(
            searchParams.get('pizzaTypes')
                ? searchParams.get('pizzaTypes')?.split(',')
                : [],
        ),
    );
    const [selectedSizes, { toggle: toggleSelectedSize }] = useSet(
        new Set<string>(
            searchParams.get('pizzaSizes')
                ? searchParams.get('pizzaSizes')?.split(',')
                : [],
        ),
    );
    const [selectedIngredients, { toggle: toggleSelectedIngredient }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(',') ?? []),
    );

    const handlePriceChange = (name: keyof PriceRange, value: number) => {
        setPrices((prevState) => ({ ...prevState, [name]: value }));
    };

    return {
        selectedPrices,
        selectedTypes,
        selectedSizes,
        selectedIngredients,
        toggleSelectedType,
        toggleSelectedSize,
        toggleSelectedIngredient,
        handlePriceChange,
    };
};
