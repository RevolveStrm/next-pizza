import { Product } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '../../../../prisma/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const query: string = searchParams?.get('query') || '';

    const products: Product[] = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
        take: 5,
    });

    return NextResponse.json(products);
}
