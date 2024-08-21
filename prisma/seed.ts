import { categories, ingredients, products, users } from './constants';
import { prisma } from './db';
import { generateProductItem } from './utils';

async function up() {
    await prisma.user.createMany({
        data: users,
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Піца Сирне Курча',
            imageUrl: '/assets/images/products/cheese_chicken_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [1, 2, 4, 14].includes(el.id),
                ),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Піца Шинка Сир',
            imageUrl: '/assets/images/products/cheese_ham_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) => [1, 2, 7].includes(el.id)),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Піца Сирна',
            imageUrl: '/assets/images/products/cheese_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [1, 2, 3, 16].includes(el.id),
                ),
            },
        },
    });

    const pizza4 = await prisma.product.create({
        data: {
            name: 'Піца Чорізо фреш',
            imageUrl: '/assets/images/products/chorizo_fresh_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [4, 2, 3, 9, 14, 15].includes(el.id),
                ),
            },
        },
    });

    const pizza5 = await prisma.product.create({
        data: {
            name: 'Піца Подвійне Курча',
            imageUrl: '/assets/images/products/double_chicken_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) => [2, 5].includes(el.id)),
            },
        },
    });

    const pizza6 = await prisma.product.create({
        data: {
            name: 'Піца Подвійне Пепероні',
            imageUrl: '/assets/images/products/double_pepperoni_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [2, 8, 11, 12, 14].includes(el.id),
                ),
            },
        },
    });

    const pizza7 = await prisma.product.create({
        data: {
            name: 'Піца Гавайська',
            imageUrl: '/assets/images/products/hawaiian_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [2, 5, 10, 13, 15].includes(el.id),
                ),
            },
        },
    });

    const pizza8 = await prisma.product.create({
        data: {
            name: 'Піца Жульєн',
            imageUrl: '/assets/images/products/julien_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [2, 5, 6, 7].includes(el.id),
                ),
            },
        },
    });

    const pizza9 = await prisma.product.create({
        data: {
            name: 'Піца Маргаріта',
            imageUrl: '/assets/images/products/margherita_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [2, 11, 14].includes(el.id),
                ),
            },
        },
    });

    const pizza10 = await prisma.product.create({
        data: {
            name: "Піца М'ясна",
            imageUrl: '/assets/images/products/meat_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [2, 5, 7, 14, 17].includes(el.id),
                ),
            },
        },
    });

    const pizza11 = await prisma.product.create({
        data: {
            name: 'Піца Пепероні фреш',
            imageUrl: '/assets/images/products/pepperoni_fresh_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [2, 8, 11, 14].includes(el.id),
                ),
            },
        },
    });

    const pizza12 = await prisma.product.create({
        data: {
            name: 'Піца Пепероні',
            imageUrl: '/assets/images/products/pepperoni_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) => [2, 8, 14].includes(el.id)),
            },
        },
    });

    const pizza13 = await prisma.product.create({
        data: {
            name: 'Піца Веганська',
            imageUrl: '/assets/images/products/vegan_pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.filter((el) =>
                    [4, 6, 11, 12, 14, 15].includes(el.id),
                ),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            ...new Array(products.length)
                .fill(0)
                .map((_, idx) => generateProductItem({ productId: idx + 1 })),

            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza4.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza5.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza6.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza6.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza6.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza6.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza6.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza7.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza7.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza7.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza7.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza8.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza8.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza8.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza8.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza8.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza9.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza9.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza9.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza9.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza9.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza10.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza10.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza10.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza10.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza10.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza10.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza11.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza11.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza11.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza11.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza11.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza12.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza12.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza12.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza12.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza12.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: pizza13.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza13.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza13.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza13.id,
                pizzaType: 2,
                size: 40,
            }),
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '11111',
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '222222',
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        },
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        console.error(`DB seeded`);
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });
