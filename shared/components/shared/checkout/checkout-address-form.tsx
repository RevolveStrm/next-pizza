'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
// import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
// import { ErrorText } from '../error-text';
import { FormTextarea } from '../form/form-textarea';
import { FormInput } from '../form/form-input';

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адреса доставки замовлення" className={className}>
            <div className="flex flex-col gap-5">
                {/* <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <>
                            <AdressInput onChange={field.onChange} />
                            {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                        </>
                    )}
                /> */}

                <FormInput name="address" className="text-base" placeholder="Адреса" />

                <FormTextarea
                    name="comment"
                    className="text-base"
                    placeholder="Коментар до замовлення"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    );
};