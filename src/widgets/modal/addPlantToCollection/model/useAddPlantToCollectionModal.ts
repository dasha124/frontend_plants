import { useCallback, useEffect, useState } from 'react';

import { CollectionsService } from '@/entities/collection/api';
import {
	EmitterEvents,
	eventEmitter,
	onEvent,
	showToast,
} from '@/shared/utils';

export const useAddPlantToCollectionModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [plantId, setPlantId] = useState<string | null>(null);
	const [collectionId] = useState<string | null>(null);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = () => {
		setIsOpen(false);
		setPlantId(null);
	};

	const handleAddToCollection = async () => {
		if (!plantId || !collectionId) {
			showToast('error', 'Не указано растение или коллекция');
			return;
		}

		try {
			setIsFetching(true);

			const collectionService = new CollectionsService();

			await collectionService.addPlantToCollection(plantId, collectionId);

			showToast('success', 'Растение добавлено в коллекцию');

			closeModal();
		} catch (error: unknown) {
			showToast(
				'error',
				error instanceof Error && error.message
					? error.message
					: 'Ошибка при выполнеии действия',
			);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		onEvent(EmitterEvents.MODAL_OPEN_PLANT_ADD_TO_COLLECTION, (payload) => {
			setPlantId(payload.plantId);
			openModal();
		});

		return () => {
			eventEmitter.off(
				EmitterEvents.MODAL_OPEN_PLANT_ADD_TO_COLLECTION,
				setPlantId,
			);
		};
	}, [openModal]);

	return {
		plantId,
		isOpen,
		isFetching,
		closeModal,
		handleAddToCollection,
	};
};
