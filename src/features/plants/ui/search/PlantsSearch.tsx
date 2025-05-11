import { Input } from 'antd';

import { usePlantsSearch } from '@/features/plants/model';
import { PlantsFilters } from '@/features/plants/ui';
import { cn } from '@/shared/lib';

const { Search } = Input;

export const PlantsSearch = () => {
	const { searchValue, handleSearch } = usePlantsSearch();

	return (
		<div
			className={cn(
				'fixed top-[calc(46px)] bg-black z-10',
				'flex items-center justify-center w-full py-4 gap-4',
				'border-b-2 border-zinc-800',
			)}
		>
			<PlantsFilters />
			<Search
				allowClear
				placeholder='Название растения'
				onSearch={handleSearch}
				defaultValue={searchValue}
				style={{ width: 250 }}
			/>
		</div>
	);
};
