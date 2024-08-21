'use client';

import React from 'react';

import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

type CheckboxItem = FilterCheckboxProps;

interface Props {
    title?: string;
    checkboxes: CheckboxItem[];
    limit?: number;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValues?: string[];
    className?: string;
    loading: boolean;
    selected: Set<string>;
    name: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    checkboxes,
    limit,
    searchInputPlaceholder = 'Пошук...',
    onClickCheckbox,
    className,
    loading,
    selected,
    name,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchInputValue, setSearchInputValue] = React.useState<string>('');

    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    const shownCheckboxes = showAll ? checkboxes : checkboxes.slice(0, limit);

    const filteredCheckboxes = searchInputValue
        ? shownCheckboxes.filter((el) =>
              el.text.toLowerCase().includes(searchInputValue.toLowerCase()),
          )
        : shownCheckboxes;

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                {...Array(limit)
                    .fill(0)
                    .map((el, idx) => (
                        <Skeleton
                            key={idx}
                            className="h-6 mb-5 rounded-[8px]"
                        />
                    ))}

                <Skeleton className="w-28 h-6 mb-5 rounded-[8px]" />
            </div>
        );
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={handleChangeInputValue}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {filteredCheckboxes.map((checkbox, idx) => (
                    <FilterCheckbox
                        key={idx}
                        text={checkbox.text}
                        value={checkbox.value}
                        endAdornment={checkbox.endAdornment}
                        checked={selected?.has(checkbox.value)}
                        onCheckedChange={() =>
                            onClickCheckbox?.(checkbox.value)
                        }
                        name={name}
                    />
                ))}
            </div>

            {limit && checkboxes.length > limit && (
                <div
                    className={
                        showAll ? 'border-t border-t-neutral-50 mt-4' : ''
                    }
                >
                    <button
                        className="text-primary mt-3"
                        onClick={() => setShowAll((prevState) => !prevState)}
                    >
                        {showAll ? 'Сховати' : '+ Показати все'}
                    </button>
                </div>
            )}
        </div>
    );
};
