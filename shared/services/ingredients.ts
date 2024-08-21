import { Ingredient } from '@prisma/client';

import { APIRoutes } from './constants';
import { http } from './http-instance';

export const getAll = async () => {
    return (await http.get<Ingredient[]>(APIRoutes.INGREDIENTS)).data;
};
