import React from 'react';

interface Props {
    code: string;
}

export const UserVerificationTemplate: React.FC<Props> = ({ code }) => (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
        <p className="text-lg mb-4">Ваш код підтвердження:</p>
        <h2 className="text-2xl font-bold text-green-600 mb-6">{code}</h2>

        <p>
            <a
                href={`http://localhost:3000/api/auth/verify?code=${code}`}
                className="text-blue-500 hover:underline text-lg"
            >
                Підтвердити реєстрацію
            </a>
        </p>
    </div>
);
