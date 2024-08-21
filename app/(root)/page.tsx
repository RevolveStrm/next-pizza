import { Suspense } from 'react';

import { findPizzas, GetSearchParams } from 'shared/lib/find-pizzas';

import {
    Container,
    Filters,
    ProductCard,
    ProductsGroupList,
    Title,
    TopBar,
} from '../../shared/components/shared';

export default async function HomePage({
    searchParams,
}: {
    searchParams: GetSearchParams;
}) {
    const categories = await findPizzas(searchParams);

    return (
        <>
            <Container className="mt-10">
                <Title text="Всі піци" size="lg" className="font-extrabold" />

                <TopBar
                    categories={categories.filter((el) => el.products.length)}
                />

                <Container className="mt-9 pb-14">
                    <div className="flex gap-[80px]">
                        <div className="w-[250px]">
                            <Suspense>
                                <Filters />
                            </Suspense>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col gap-16">
                                {categories?.length > 0 &&
                                    categories
                                        .filter(
                                            (category) =>
                                                category.products.length,
                                        )
                                        .map((category) => (
                                            <ProductsGroupList
                                                key={category.id}
                                                title={category.name}
                                                categoryId={category.id}
                                                products={category.products}
                                            />
                                        ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Container>
        </>
    );
}
