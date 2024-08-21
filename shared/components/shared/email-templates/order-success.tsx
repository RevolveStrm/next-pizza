import { CartItemDTO } from 'shared/services/dto/cart.dto';
import React from 'react';

interface Props {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
    <div
        style={{
            backgroundColor: '#f7fafc', // bg-gray-100
            padding: '1.5rem', // p-6
            borderRadius: '0.5rem', // rounded-lg
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', // shadow-lg
            maxWidth: '28rem', // max-w-md
            margin: '0 auto', // mx-auto
        }}
    >
        <h1
            style={{
                fontSize: '1.5rem', // text-2xl
                fontWeight: 'bold', // font-bold
                marginBottom: '1rem', // mb-4
            }}
        >
            Дякуємо за покупку! 🎉
        </h1>

        <p
            style={{
                fontSize: '1.125rem', // text-lg
                marginBottom: '1rem', // mb-4
            }}
        >
            Ваше замовлення #{orderId} оплачено. Список товарів:
        </p>

        <hr
            style={{
                marginBottom: '1rem', // mb-4
                border: 'none',
                borderBottom: '1px solid #e5e7eb', // border-gray-200
            }}
        />

        <ul
            style={{
                listStyleType: 'disc', // list-disc
                paddingLeft: '1.25rem', // pl-5
                marginBottom: '0', // mb-0
            }}
        >
            {items.map((item) => (
                <li
                    key={item.id}
                    style={{
                        fontSize: '1.125rem', // text-lg
                        marginBottom: '0.5rem', // space-y-2
                    }}
                >
                    <span style={{ fontWeight: '600' }}>{item.productItem.product.name}</span> |{' '}
                    {item.productItem.price} ₴ x {item.quantity} шт. ={' '}
                    <span style={{ color: '#16a34a' }}>{item.productItem.price * item.quantity} ₴</span>
                </li>
            ))}
        </ul>
    </div>
);
