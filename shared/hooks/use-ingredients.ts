import React from "react";
import { API } from "../services/api-client";
import { Ingredient } from "@prisma/client";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useIngredients = (): ReturnProps => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true);

                const ingredients: Ingredient[] = await API.ingredients.getAll();

                setIngredients(ingredients);
            } catch (e) {
                console.error(e);
            }

            setLoading(false);
        }

        fetchIngredients();
    }, []);

    return { ingredients, loading };
}