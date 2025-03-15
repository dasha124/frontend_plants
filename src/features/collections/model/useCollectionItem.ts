import { useMemo } from 'react';

import { TCollectionShortInfo } from '@/entities/collection/model';

export const useCollectionItem = (collection: TCollectionShortInfo) => {
	const fields = useMemo(
		() => [
			{
				key: '1',
				label: 'Дата создания',
				value: collection.dateCreate + collection.timeCreate,
			},
			{
				key: '2',
				label: 'Статус',
				value: collection.status,
			},
			{
				key: '3',
				label: 'Колличество растений',
				value: collection.plantsCount,
			},
		],
		[collection],
	);

	return { fields };
};
