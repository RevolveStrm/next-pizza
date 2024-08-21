'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { registerUser } from 'app/actions';
import { FormInput, Title } from 'shared/components/shared';
import { Button } from 'shared/components/ui';
import {
    RegistrationFormFields,
    registrationFormSchema,
} from 'shared/constants/auth-form-schema';

interface Props {
    onClose?: VoidFunction;
    onSuccess?: VoidFunction;
    className?: string;
}

export const RegisterForm: React.FC<Props> = ({
    className,
    onClose,
    onSuccess,
}) => {
    const form = useForm<RegistrationFormFields>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegistrationFormFields) => {
        try {
            await registerUser(data);

            toast.success('Реєстрація пройшла успішно');

            onSuccess?.();
        } catch (error) {
            console.error('[REGISTER ERROR]', error);
            toast.error('Не вдалось зареєструвати акаунт');
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
                            text="Реєстрація акаунту"
                            size="md"
                            className="font-bold"
                        />
                        <p className="text-gray-400">
                            Введіть свої, щоб зареєструвати акаунт
                        </p>
                    </div>
                </div>

                <FormInput name="fullName" placeholder="Full Name" />
                <FormInput name="email" placeholder="Email" />
                <FormInput
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <FormInput
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                />

                <Button
                    disabled={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    {form.formState.isSubmitting
                        ? 'Реєструємо...'
                        : 'Зареєструватись'}
                </Button>
            </form>
        </FormProvider>
    );
};
