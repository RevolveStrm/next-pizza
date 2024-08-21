import { Container, ProductForm } from 'shared/components/shared';
import { prisma } from 'prisma/db';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    if (isNaN(Number(id))) {
        return notFound();
    }

    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
            items: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <ProductForm product={product} />
        </Container>
    );
}