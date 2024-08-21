import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/db";
import { Ingredient } from "@prisma/client";

export async function GET() {
    const ingredients: Ingredient[] = await prisma.ingredient.findMany();

    return NextResponse.json(ingredients);
}