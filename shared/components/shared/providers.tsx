'use client';

import React, { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export const Providers: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
            <Toaster />
            <NextTopLoader />
        </>
    );
}