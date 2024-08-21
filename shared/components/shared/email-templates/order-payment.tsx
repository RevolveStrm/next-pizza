import React from 'react';

interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const OrderPaymentTemplate: React.FC<Props> = ({
    orderId,
    totalAmount,
    paymentUrl,
}) => (
    <div
        style={{
            backgroundColor: '#f9f9f9',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '0 auto',
            textAlign: 'center',
        }}
    >
        <h1
            style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '16px',
            }}
        >
            Замовлення #{orderId}
        </h1>

        <p
            style={{
                fontSize: '1.125rem',
            }}
        >
            Оплатіть замовлення на суму{' '}
            <b
                style={{
                    color: '#2f855a',
                }}
            >
                {totalAmount} ₴
            </b>
            . Перейдіть{' '}
            <a
                href={paymentUrl}
                style={{
                    color: '#3182ce',
                    textDecoration: 'underline',
                }}
            >
                за цим посиланням
            </a>{' '}
            для оплати замовлення.
        </p>
    </div>
);
