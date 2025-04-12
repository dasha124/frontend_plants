import React from 'react';
import { useDispatch } from 'react-redux';

import { CollectionsService } from '@/entities/collection/api';
import { setCollectionAction } from '@/entities/collection/model';
import { showToast } from '@/shared/utils';

export const useDeleteBtn = (plantId: string, collectionId: string | null) => {
	const dispatch = useDispatch();

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		if (!collectionId) return;

		try {
			const collectionService = new CollectionsService();

			const collectionInfo = await collectionService.deletePlantFromCollection(
				plantId,
				collectionId,
			);

			showToast('success', 'Растение удалено из коллекции');

			dispatch(setCollectionAction(collectionInfo));
		} catch (error: unknown) {
			showToast(
				'error',
				error instanceof Error && error.message
					? error.message
					: 'Ошибка при выполнеии действия',
			);
		}
	};

	return { handleClick };
};
