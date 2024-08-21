import { Ingredient } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '../../../prisma/db';

export async function GET() {
    const ingredients: Ingredient[] = await prisma.ingredient.findMany();

    return NextResponse.json(ingredients);
}
