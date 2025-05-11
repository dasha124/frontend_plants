import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CollectionsService } from '@/entities/collection/api';
import {
	deleteCollectionsAction,
	selectCollections,
	setCollectionsAction,
} from '@/entities/collection/model';
import { showError } from '@/shared/utils';

export const useCollections = () => {
	const dispatch = useDispatch();

	const collections = useSelector(selectCollections);

	const [isLoaded, setIsLoaded] = useState(false);

	const loadCollections = useCallback(async () => {
		try {
			const collectionsService = new CollectionsService();

			const items = await collectionsService.getCollections();

			dispatch(setCollectionsAction(items.map((item) => item.toShortInfo())));
		} catch (error: unknown) {
			dispatch(deleteCollectionsAction());

			showError(error);
		} finally {
			setIsLoaded(true);
		}
	}, [dispatch]);

	useEffect(() => {
		loadCollections();
	}, [loadCollections]);

	return { collections, isLoaded };
};
