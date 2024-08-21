import { Ingredient } from "@prisma/client";
import { http } from "./http-instance"
import { APIRoutes } from "./constants";

export const getAll = async () => {
    return (await (http.get<Ingredient[]>(APIRoutes.INGREDIENTS))).data;
};