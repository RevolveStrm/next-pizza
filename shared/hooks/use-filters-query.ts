'use client';

import { useRouter } from 'next/navigation';
import qs from 'qs';
import React from 'react';

import { Filters } from './use-filters';

export const useFiltersQuery = (filters: Filters) => {
    const isMounted = React.useRef(false);
    const router = useRouter();

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.selectedPrices,
                pizzaTypes: Array.from(filters.selectedTypes),
                pizzaSizes: Array.from(filters.selectedSizes),
                ingredients: Array.from(filters.selectedIngredients),
            };

            const query = qs.stringify(params, {
                arrayFormat: 'comma',
                skipNulls: true,
            });

            router.push(`?${query}`, {
                scroll: false,
            });
        }

        isMounted.current = true;
    }, [filters]);
};
