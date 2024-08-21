import { Metadata } from 'next';
import { Suspense } from 'react';

import { Container, Header } from 'shared/components/shared';

export const metadata: Metadata = {
    title: 'Next Pizza | Замовлення',
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Container>
                <Suspense>
                    <Header hasSearch={false} className="border-b-gray-200" />
                </Suspense>
                {children}
            </Container>
        </main>
    );
}
