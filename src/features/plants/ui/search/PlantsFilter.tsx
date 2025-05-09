import { Button, Popover } from 'antd';
import { Checkbox, Select } from 'antd';
import React from 'react';

import { usePlantsFilters } from '@/features/plants/model';

export const PlantsFilters: React.FC = () => {
	const {
		isAdmin,
		open,
		params,
		typeOptionValues,
		classOptionValues,
		subclassOptionValues,
		handleOpenChange,
		handleTypeChange,
		handleClassChange,
		handleSubclassChange,
		handleWaterChange,
		handleToxicChange,
		handleStatusChange,
	} = usePlantsFilters();

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
						value={params.type}
						onChange={handleTypeChange}
					/>
					<Select
						placeholder='Класс растения'
						optionFilterProp='label'
						options={classOptionValues}
						showSearch
						allowClear
						value={params.class}
						onChange={handleClassChange}
					/>
					<Select
						placeholder='Подкласс растения'
						optionFilterProp='label'
						options={subclassOptionValues}
						showSearch
						allowClear
						value={params.subclass}
						onChange={handleSubclassChange}
					/>

					<Checkbox
						checked={params.water === 'обильный'}
						onChange={(e) => handleWaterChange(e.target.checked)}
					>
						Полив
					</Checkbox>
					<Checkbox
						checked={params.no_toxic === 'yes'}
						onChange={(e) => handleToxicChange(e.target.checked)}
					>
						Не токсичные
					</Checkbox>

					{isAdmin && (
						<Checkbox
							checked={params.status === 'Удалено'}
							onChange={(e) => handleStatusChange(e.target.checked)}
						>
							Удалено
						</Checkbox>
					)}
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
