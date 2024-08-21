'use client'

import React from "react";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar, Container, Title } from "shared/components/shared";
import { useCart } from "shared/hooks";
import { calcCheckoutTotalPriceDetails } from "shared/lib/calc-checkout-total-price";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutFormFields, checkoutFormSchema } from "shared/constants/checkout-form-schema";
import { createOrder } from "app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { API } from "shared/services/api-client";

export default function CheckoutPage() {
    const form = useForm<CheckoutFormFields>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: ''
        }
    });

    React.useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await API.auth.getUserInformation();

            if (!data) {
                return;
            }

            const [firstName, lastName] = data.fullName.split(" ");

            form.setValue('email', data.email);
            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName ?? '');
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = async (data: CheckoutFormFields) => {
        try {
            const paymentURL: string | undefined = await createOrder(data);

            if (paymentURL) {
                toast.error('Замовлення успішно оформлено! 📝 Перехід до оплати... ', {
                    icon: '✅',
                });

                location.href = paymentURL;
            }
        } catch (error) {
            console.error(error);
            toast.error('Не вдалось оформити замовлення', {
                icon: '❌',
            })
        }
    };

    const {
        totalAmount,
        items,
        updateItemQuantity,
        removeCartItem,
        loading
    } = useCart();

    const handleClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

        if (newQuantity > 0) {
            updateItemQuantity(id, newQuantity);
        } else {
            removeCartItem(id);
        }
    };

    const checkoutTotalPriceDetails = calcCheckoutTotalPriceDetails(totalAmount);

    return (
        <Container className="mt-10">
            <Title text="Оформлення замовлення" className="font-extrabold mb-8 text-[36px]" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                items={items}
                                loading={loading}
                                handleItemRemove={removeCartItem}
                                handleItemCount={handleClickCountButton}
                            />

                            <CheckoutPersonalForm className={loading || !items.length ? "opacity-40 pointer-events-none" : ""} />

                            <CheckoutAddressForm className={loading || !items.length ? "opacity-40 pointer-events-none" : ""} />
                        </div>

                        <CheckoutSidebar checkoutTotalPriceDetails={checkoutTotalPriceDetails} />
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}