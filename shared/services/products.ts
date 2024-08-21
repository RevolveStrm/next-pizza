import { Product } from "@prisma/client";
import { http } from "./http-instance"
import { APIRoutes } from "./constants";

export const search = async (query: string) => {
    return (await (http.get<Product[]>(APIRoutes.SEARCH_PRODUCTS, { params: { query } }))).data;
};