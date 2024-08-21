'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters, useFiltersQuery, useIngredients } from 'shared/hooks';
import { PriceRangeValues } from 'shared/hooks/use-filters';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();

    const filters = useFilters();

    useFiltersQuery(filters);

    const items = ingredients.map(ingredient => ({ value: String(ingredient.id), text: ingredient.name }));

    return (
        <div className={className}>
            <Title text='Фільтрація' size='sm' className='mb-5 font-bold' />

            <CheckboxFiltersGroup
                title='Тип тіста'
                className='mt-5'
                name='types'
                limit={2}
                loading={false}
                onClickCheckbox={filters.toggleSelectedType}
                selected={filters.selectedTypes}
                checkboxes={[
                    { value: '1', text: 'Тонке' },
                    { value: '2', text: 'Традиційне' }
                ]}
            />

            <CheckboxFiltersGroup
                title='Розмір піци'
                className='mt-5'
                name='sizes'
                limit={3}
                loading={false}
                onClickCheckbox={filters.toggleSelectedSize}
                selected={filters.selectedSizes}
                checkboxes={[
                    { value: '20', text: '20 см' },
                    { value: '30', text: '30 см' },
                    { value: '40', text: '40 см' },
                ]}
            />

            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Ціна від та до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input
                        type='number'
                        placeholder='0'
                        min={0}
                        max={1000}
                        value={String(filters.selectedPrices.priceFrom)}
                        onChange={(e) => filters.handlePriceChange('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type='number'
                        placeholder='1000'
                        min={30}
                        max={1000}
                        value={String(filters.selectedPrices.priceTo)}
                        onChange={(e) => filters.handlePriceChange('priceTo', Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        filters.selectedPrices?.priceFrom || PriceRangeValues.MIN_PRICE_FROM,
                        filters.selectedPrices?.priceTo || PriceRangeValues.MAX_PRICE_TO
                    ]}
                    onValueChange={(values) => {
                        filters.handlePriceChange('priceFrom', values[0])
                        filters.handlePriceChange('priceTo', values[1])
                    }}
                />
            </div>

            <CheckboxFiltersGroup
                title='Інгредієнти'
                className='mt-5'
                name='ingredients'
                limit={5}
                checkboxes={items}
                loading={loading}
                onClickCheckbox={filters.toggleSelectedIngredient}
                selected={filters.selectedIngredients}
            />
        </div>
    );
}