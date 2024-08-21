import React from 'react';

import { useSession } from 'next-auth/react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface Props {
    className?: string;
    onClickSignIn?: () => void;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
    const { data: session } = useSession();

    if (session) {
        return (
            <Link href="/profile">
                <Button
                    variant='secondary'
                    className='flex items-center gap-2'
                >
                    <CircleUser size={18} />
                    Профіль
                </Button>
            </Link>
        );
    }

    return (
        <Button onClick={() => {
            onClickSignIn?.();
        }}
            variant='outline'
            className='flex items-center gap-1'
        >
            <User size={16} />
            Увійти
        </Button>
    );
}