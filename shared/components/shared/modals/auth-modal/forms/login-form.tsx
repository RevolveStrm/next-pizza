'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormInput } from 'shared/components/shared/form/form-input';
import { Title } from 'shared/components/shared/title';
import { Button } from 'shared/components/ui';
import {
    LoginFormFields,
    loginFormSchema,
} from 'shared/constants/auth-form-schema';

interface Props {
    onClose?: VoidFunction;
    className?: string;
}

export const LoginForm: React.FC<Props> = ({ className, onClose }) => {
    const form = useForm<LoginFormFields>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormFields) => {
        try {
            const response = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!response?.ok) {
                throw Error();
            }

            toast.success('Авторизація пройшла успішно');

            onClose?.();
        } catch (error) {
            console.error('[LOGIN ERROR]', error);
            toast.error('Не вдалось увійти в акаунт');
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title
                            text="Вхід в акаунт"
                            size="md"
                            className="font-bold"
                        />
                        <p className="text-gray-400">
                            Введіть свою пошту, щоб зайти в свій акаунт
                        </p>
                    </div>
                </div>

                <FormInput name="email" placeholder="Email" />
                <FormInput
                    name="password"
                    placeholder="Password"
                    type="password"
                />

                <Button
                    disabled={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    {form.formState.isSubmitting ? 'Вхід...' : 'Увійти'}
                </Button>
            </form>
        </FormProvider>
    );
};
