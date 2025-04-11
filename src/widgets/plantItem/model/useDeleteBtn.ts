import React from 'react';

import { CollectionsService } from '@/entities/collection/api';
import { showToast } from '@/shared/utils';

export const useDeleteBtn = (plantId: string, collectionId: string | null) => {
	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		if (!collectionId) return;

		try {
			const collectionService = new CollectionsService();

			await collectionService.deletePlantFromCollection(plantId, collectionId);

			showToast('success', 'Растение удалено из коллекции');
			// TODO: перезапросить данные о коллекции
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
