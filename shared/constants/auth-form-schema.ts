import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long');

export const loginFormSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .min(2, 'Email must be at least 2 characters long'),
    password: passwordSchema,
});

export const registrationFormSchema = loginFormSchema
    .merge(
        z.object({
            fullName: z.string().min(2, 'Enter your full name'),
            confirmPassword: passwordSchema,
        }),
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type LoginFormFields = z.infer<typeof loginFormSchema>;
export type RegistrationFormFields = z.infer<typeof registrationFormSchema>;
