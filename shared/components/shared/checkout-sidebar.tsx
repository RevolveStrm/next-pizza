import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React from 'react';

import { CheckoutTotalPriceDetails } from 'shared/lib/calc-checkout-total-price';
import { cn } from 'shared/lib/utils';

import { CheckoutItemDetails } from './checkout-item-details';
import { WhiteBlock } from './white-block';
import { Button } from '../ui';

interface Props {
    className?: string;
    loading?: boolean;
    checkoutTotalPriceDetails: CheckoutTotalPriceDetails;
}

export const CheckoutSidebar: React.FC<Props> = ({
    className,
    checkoutTotalPriceDetails,
    loading,
}) => {
    return (
        <div className={cn('w-[450px]', className)}>
            <WhiteBlock className="p-6 sticky top-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xl">Загальна вартість:</span>
                    <span className="text-[34px] font-extrabold">
                        {checkoutTotalPriceDetails.totalPrice} ₴
                    </span>
                </div>

                <div className="flex flex-col gap-3 mt-5">
                    <CheckoutItemDetails
                        title="Вартість товарів"
                        value={`${checkoutTotalPriceDetails.itemsPrice} ₴`}
                        startAdornment={<Package opacity={0.4} size={18} />}
                    />
                    <CheckoutItemDetails
                        title="Податок"
                        value={`${checkoutTotalPriceDetails.vatPrice} ₴`}
                        startAdornment={<Percent opacity={0.4} size={18} />}
                    />
                    <CheckoutItemDetails
                        title="Доставка"
                        value={`${checkoutTotalPriceDetails.deliveryPrice} ₴`}
                        startAdornment={<Truck opacity={0.4} size={18} />}
                    />
                </div>

                <div className="mt-10">
                    <Button
                        loading={loading}
                        disabled={!checkoutTotalPriceDetails.itemsPrice}
                        type="submit"
                        className="w-full h-12 text-base font-bold"
                    >
                        Перейти до оплати
                        <ArrowRight className="w-5 ml-2" />
                    </Button>
                </div>
            </WhiteBlock>
        </div>
    );
};
