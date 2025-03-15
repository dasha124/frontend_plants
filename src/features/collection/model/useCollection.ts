import { useCallback, useEffect, useMemo, useState } from 'react';

import { CollectionsService } from '@/entities/collection/api';
import { CollectionInfo } from '@/entities/collection/model';
import { showToast } from '@/shared/utils';

export const useCollection = (id: string) => {
	const [collectionInfo, setCollectionInfo] = useState<CollectionInfo | null>(
		null,
	);
	const [isLoaded, setIsLoaded] = useState(false);

	const fields = useMemo(
		() =>
			collectionInfo
				? [
						{
							key: '1',
							label: 'Дата создания',
							value: collectionInfo.dateCreate + collectionInfo.timeCreate,
						},
						{
							key: '2',
							label: 'Статус',
							value: collectionInfo.status,
						},
					]
				: [],
		[collectionInfo],
	);

	const loadCollectionInfo = useCallback(async (id: string) => {
		try {
			const collectionsService = new CollectionsService();

			const collection = await collectionsService.getCollectionInfo(id);
			setCollectionInfo(collection);
		} catch (error: unknown) {
			setCollectionInfo(null);

			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		} finally {
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		loadCollectionInfo(id);
	}, [id, loadCollectionInfo]);

	return { isLoaded, collectionInfo, fields };
};
