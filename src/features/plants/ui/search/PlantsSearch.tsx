import { Checkbox, GetProps, Select } from 'antd';
import { Input } from 'antd';
import { Button, Popover } from 'antd';
import React, { useMemo, useState } from 'react';

import { EPlantType } from '@/entities/plant/model';
import { cn } from '@/shared/lib';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
	// eslint-disable-next-line no-undef
	console.log(info?.source, value);

export const PlantsSearch = () => {
	return (
		<div
			className={cn(
				'fixed top-[calc(46px)] bg-black z-10',
				'flex items-center justify-center w-full py-4 gap-4',
				'border-b-2 border-zinc-800',
			)}
		>
			<Filters />
			<Search
				placeholder='Введите название растения'
				onSearch={onSearch}
				style={{ width: 250 }}
			/>
		</div>
	);
};

const Filters: React.FC = () => {
	const [open, setOpen] = useState(false);

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
	};

	const typeOptionValues = useMemo(
		() => Object.values(EPlantType).map((key) => ({ value: key, label: key })),
		[],
	);

	return (
		<Popover
			content={
				<div className={'flex flex-col gap-2'}>
					<Select
						placeholder='Тип растения'
						optionFilterProp='label'
						options={typeOptionValues}
						showSearch
						allowClear
					/>
					<Select
						placeholder='Класс растения'
						optionFilterProp='label'
						options={typeOptionValues}
						showSearch
						allowClear
					/>
					<Select
						placeholder='Подкласс растения'
						optionFilterProp='label'
						options={typeOptionValues}
						showSearch
						allowClear
					/>
					<Checkbox>Не токсичные</Checkbox>
					<Checkbox>Полив</Checkbox>
					<Checkbox>Удалено</Checkbox>
				</div>
			}
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
		>
			<Button type='primary'>Фильтры</Button>
		</Popover>
	);
};
