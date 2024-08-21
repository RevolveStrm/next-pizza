import { notFound } from 'next/navigation';

import { prisma } from 'prisma/db';
import { ChooseProductModal } from 'shared/components/shared';
import { ProductWithRelations } from 'types/product';

export default async function ProductModalPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product: ProductWithRelations | null = await prisma.product.findFirst(
        {
            where: {
                id: Number(id),
            },
            include: {
                ingredients: true,
                items: true,
            },
        },
    );

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} />;
}
