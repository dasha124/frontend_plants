import { useCallback, useEffect, useState } from 'react';

import { CollectionsService } from '@/entities/collection/api';
import { TCollectionShortInfo } from '@/entities/collection/model';
import { showToast } from '@/shared/utils';

export const useCollections = () => {
	const [collections, setCollections] = useState<TCollectionShortInfo[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const loadCollections = useCallback(async () => {
		try {
			const collectionsService = new CollectionsService();

			const items = await collectionsService.getCollections();
			setCollections(items.map((item) => item.toShortInfo()));
		} catch (error: unknown) {
			setCollections([]);

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
		loadCollections();
	}, [loadCollections]);

	return { collections, isLoaded };
};
