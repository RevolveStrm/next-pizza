import React from 'react';
import { cn } from 'shared/lib/utils';

interface Props {
    title?: string;
    value?: string | number;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    className?: string;
}

export const CheckoutItemDetails: React.FC<Props> = ({ className, title, value, startAdornment, endAdornment }) => {
    return (
        <div className={cn("flex gap-4", className)}>
            <span className="flex flex-1 gap-2 text-lg text-neutral-500">
                <div className="relative top-1">
                    {startAdornment}
                </div>
                {title}
                <div className="flex flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
            </span>
            <span className="font-bold text-lg">{value}</span>
            {endAdornment}
        </div>
    );
}