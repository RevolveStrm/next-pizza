'use client';

import React from 'react';
import { Title } from './title';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { Container } from './container';
import { FormInput } from './form/form-input';
import { Button } from '../ui';
import { RegistrationFormFields } from 'shared/constants/auth-form-schema';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { updateUser } from 'app/actions';

interface Props {
    data: User;
    className?: string;
}

export const ProfileForm: React.FC<Props> = ({ data, className }) => {
    const form = useForm<RegistrationFormFields>({
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: RegistrationFormFields) => {
        try {
            await updateUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password
            });

            toast.success('Дані було успішно оновлено');
        } catch (error) {
            console.error(error);
            console.error("[UPDATE_USER_PROFILE_INFO_ERROR]", error);
            toast.error("Не вдалось оновити дані");
        }
    };

    const onClickSignOut = async () => {
        signOut({
            callbackUrl: "/"
        });
    };

    return (
        <Container className="my-10">
            <Title text='Особисті дані' size='md' className='font-bold' />

            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Повне ім'я" required />

                    <FormInput type="password" name="password" label="Новий пароль" required />
                    <FormInput type="password" name="confirmPassword" label="Повторіть пароль" required />

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Зберегти
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button">
                        Вийти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
}