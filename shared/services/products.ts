import { Product } from '@prisma/client';

import { APIRoutes } from './constants';
import { http } from './http-instance';

export const search = async (query: string) => {
    return (
        await http.get<Product[]>(APIRoutes.SEARCH_PRODUCTS, {
            params: { query },
        })
    ).data;
};
