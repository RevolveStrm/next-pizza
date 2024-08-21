'use client';

import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { SearchInput } from './search-input';
import { cn } from 'shared/lib/utils';
import { CartButton } from './cart-button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals/auth-modal/auth-modal';

interface Props {
    hasSearch?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams();

    React.useState(() => {
        setTimeout(() => {
            if (searchParams.has('paid')) {
                toast.success(`Замовлення успішно оплачено! Інформація була відправлена на пошту.`)
            }
            if (searchParams.has('unpaid')) {
                toast.error(`Замовлення не було оплачено! Спробуйте оплатити знову.`)
            }
            if (searchParams.has('verified')) {
                toast.success(`Акаунт було успішно підтверджено!`)
            }
        }, 500);
    }, []);

    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>

                <Link href='/'>
                    <div className='flex items-center gap-4'>
                        <Image src={'/logo.png'} alt='logo' height={35} width={35} />
                        <div>
                            <h1 className='text-2xl uppercase font-black'>Next Піца</h1>
                            <p className='text-sm font-gray-400 leading-3'>смачніше нікуди</p>
                        </div>
                    </div>
                </Link>

                <div className='mx-10 flex-1'>
                    {hasSearch && <SearchInput />}
                </div>

                <div className='flex items-center gap-3'>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

                    <CartButton />
                </div>
            </Container>
        </header>
    );
}