import { useMemo } from 'react';

import { TCollectionShortInfo } from '@/entities/collection/model';
import { formatDate } from '@/entities/collection/utils';

export const useCollectionItem = (collection: TCollectionShortInfo) => {
	const fields = useMemo(
		() => [
			{
				key: '1',
				label: 'Дата создания',
				value: formatDate(collection.dateCreate, collection.timeCreate),
			},
			{
				key: '2',
				label: 'Статус',
				value: collection.status,
			},
			{
				key: '3',
				label: 'Количество растений',
				value: collection.plantsCount,
			},
		],
		[collection],
	);

	return { fields };
};
