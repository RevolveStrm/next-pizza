import React from 'react';

interface Props {
    verificationUrl: string;
}

export const VerificationCodeTemplate: React.FC<Props> = ({ verificationUrl }) => (
    <div
        style={{
            backgroundColor: '#f7fafc', // bg-gray-100
            padding: '1.5rem', // p-6
            borderRadius: '0.5rem', // rounded-lg
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', // shadow-lg
            maxWidth: '28rem', // max-w-md
            margin: '0 auto', // mx-auto
            textAlign: 'center',
        }}
    >
        <h1
            style={{
                fontSize: '1.5rem', // text-2xl
                fontWeight: 'bold', // font-bold
                marginBottom: '1rem', // mb-4
            }}
        >
            Підтвердження акаунту
        </h1>

        <p
            style={{
                fontSize: '1.125rem', // text-lg
                marginBottom: '1rem', // mb-4
                color: '#4a5568', // text-gray-700
            }}
        >
            Ваше посилання для підтвердження:
        </p>

        <a
            href={verificationUrl}
            style={{
                display: 'inline-block',
                fontSize: '1.25rem', // text-xl
                fontWeight: 'bold', // font-bold
                padding: '0.75rem 1.5rem', // p-3
                backgroundColor: '#3182ce', // bg-blue-600
                borderRadius: '0.5rem', // rounded-lg
                color: '#fff', // text-white
                textDecoration: 'none', // no underline
            }}
        >
            Підтвердити акаунт
        </a>
    </div>
);
