import React from 'react';

interface Props {
    className?: string;
}

export const RequiredSymbol: React.FC<Props> = ({ className }) => {
    return <span className='font-small text-red-500'>*</span>;
}