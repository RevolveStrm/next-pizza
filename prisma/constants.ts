import { Category, Ingredient, Product, User, UserRole } from "@prisma/client";
import { hashSync } from 'bcrypt'

export const SIZE_TO_MIN_PRICE = {
    20: 100,
    30: 150,
    40: 200
};

export const SIZE_TO_MAX_PRICE = {
    20: 150,
    30: 200,
    40: 250
};

export const users: Omit<User, 'id' | 'provider' | 'providerId' | 'createdAt' | 'updatedAt'>[] = [
    {
        "fullName": "Stepan Vladyka",
        "email": "highskillinvoker@gmail.com",
        "password": hashSync('12345678', 10),
        "verifiedAt": new Date(),
        "role": UserRole.USER
    },
    {
        "fullName": "John Doe",
        "email": "john.doe@gmail.com",
        "password": hashSync('password123', 10),
        "verifiedAt": new Date(),
        "role": UserRole.USER
    },
    {
        "fullName": "Jane Smith",
        "email": "jane.smith@gmail.com",
        "password": hashSync('securepass456', 10),
        "verifiedAt": new Date(),
        "role": UserRole.USER
    },
    {
        "fullName": "Alice Johnson",
        "email": "alice.johnson@gmail.com",
        "password": hashSync("mypassword789", 10),
        "verifiedAt": new Date(),
        "role": UserRole.USER
    },
    {
        "fullName": "Alex Yankovic",
        "email": "alex.yankovic@gmail.com",
        "password": hashSync("adminisgod098", 10),
        "verifiedAt": new Date(),
        "role": UserRole.ADMIN
    },
];

export const categories: Omit<Category, "id" | "createdAt" | "updatedAt">[] = [
    {
        name: "Піци",
    },
    {
        name: "Закуски",
    },
    {
        name: "Напої",
    },
    {
        name: "Десерти",
    }
];

export const ingredients: Omit<Ingredient, "createdAt" | "updatedAt">[] = [
    {
        id: 1,
        name: 'Сирний борт',
        price: 99,
        imageEngName: 'cheese_bort',
    },
    {
        id: 2,
        name: 'Вершкова моццарела',
        price: 39,
        imageEngName: 'creamy_mozzarella',
    },
    {
        id: 3,
        name: 'Сири чеддер та пармезан',
        price: 39,
        imageEngName: 'cheddar_and_parmesan_cheeses',
    },
    {
        id: 4,
        name: 'Гострий перець халапеньйо',
        price: 19,
        imageEngName: 'spicy_jalapeno_pepper',
    },
    {
        id: 5,
        name: 'Ніжне курча',
        price: 49,
        imageEngName: 'tender_chicken',
    },
    {
        id: 6,
        name: 'Шампіньйони',
        price: 25,
        imageEngName: 'champignons',
    },
    {
        id: 7,
        name: 'Шинка',
        price: 35,
        imageEngName: 'ham',
    },
    {
        id: 8,
        name: 'Пікантна пепероні',
        price: 49,
        imageEngName: 'spicy_pepperoni',
    },
    {
        id: 9,
        name: 'Гостра чорізо',
        price: 49,
        imageEngName: 'spicy_chorizo',
    },
    {
        id: 10,
        name: 'Мариновані огірки',
        price: 10,
        imageEngName: 'pickled_cucumbers',
    },
    {
        id: 11,
        name: 'Свіжі томати',
        price: 20,
        imageEngName: 'fresh_tomatoes',
    },
    {
        id: 12,
        name: 'Червона цибуля',
        price: 10,
        imageEngName: 'red_onion',
    },
    {
        id: 13,
        name: 'Соковиті ананаси',
        price: 30,
        imageEngName: 'juicy_pineapples',
    },
    {
        id: 14,
        name: 'Італійські трави',
        price: 5,
        imageEngName: 'italian_herbs',
    },
    {
        id: 15,
        name: 'Солодкий перець',
        price: 59,
        imageEngName: 'sweet_pepper',
    },
    {
        id: 16,
        name: 'Кубики бринзи',
        price: 39,
        imageEngName: 'brynza_cubes',
    },
    {
        id: 17,
        name: 'Тефтелі',
        price: 65,
        imageEngName: 'meatballs',
    },
].map((obj, index) => ({
    ...obj,
    imageUrl: `/assets/images/ingredients/${obj.imageEngName}.png`,
}))
    .map(el => ({ id: el.id, name: el.name, price: el.price, imageUrl: el.imageUrl }));

export const products: Omit<Product, "id" | "createdAt" | "updatedAt">[] = [
    {
        name: 'Рол Шинка Сир',
        imageUrl: '/assets/images/products/cheese_ham_roll.png',
        categoryId: 2,
    },
    {
        name: 'Сендвіч Шинка Сир',
        imageUrl: '/assets/images/products/cheese_ham_sandwich.png',
        categoryId: 2,
    },
    {
        name: 'Картопля Фрі',
        imageUrl: '/assets/images/products/french_fries.png',
        categoryId: 2,
    },
    {
        name: 'Картопля Фрі з соусом',
        imageUrl: '/assets/images/products/french_fries_with_sauce.png',
        categoryId: 2,
    },
    {
        name: 'Байтси Курячі',
        imageUrl: '/assets/images/products/chicken_bites.png',
        categoryId: 2,
    },
    {
        name: 'Нагетси Курячі',
        imageUrl: '/assets/images/products/chicken_nuggets.png',
        categoryId: 2,
    },
    {
        name: 'Напій Coca-Cola пляшка',
        imageUrl: '/assets/images/products/coca_cola_bottle.png',
        categoryId: 3,
    },
    {
        name: 'Напій Sprite пляшка',
        imageUrl: '/assets/images/products/sprite_bottle.png',
        categoryId: 3,
    },
    {
        name: 'Вода Моршинська пляшка',
        imageUrl: '/assets/images/products/water_bottle.png',
        categoryId: 3,
    },
    {
        name: 'Кава Капучино',
        imageUrl: '/assets/images/products/cappuccino_coffee.png',
        categoryId: 3,
    },
    {
        name: 'Кава Лате',
        imageUrl: '/assets/images/products/latte_coffee.png',
        categoryId: 3,
    },
    {
        name: 'Кава Американо',
        imageUrl: '/assets/images/products/americano_coffee.png',
        categoryId: 3,
    },
    {
        name: 'Кава Косове Капучино',
        imageUrl: '/assets/images/products/coconut_cappuccino_coffee.png',
        categoryId: 3,
    },
    {
        name: 'Кава Карамельне Капучино',
        imageUrl: '/assets/images/products/caramel_cappuccino_coffee.png',
        categoryId: 3,
    },
    {
        name: 'Кава Горіхове Капучино',
        imageUrl: '/assets/images/products/hazelnut_cappuccino_coffee.png',
        categoryId: 3,
    },
    {
        name: 'Мафін Шоколадний',
        imageUrl: '/assets/images/products/chocolate_muffin_dessert.png',
        categoryId: 4,
    },
    {
        name: 'Чізкейк Нью-Йорк',
        imageUrl: '/assets/images/products/cheesecake_dessert.png',
        categoryId: 4,
    }
];
