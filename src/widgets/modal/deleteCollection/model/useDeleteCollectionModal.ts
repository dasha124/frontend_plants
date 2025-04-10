import { useCallback, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { CollectionsService } from '@/entities/collection/api';
import { EmitterEvents, eventEmitter, showToast } from '@/shared/utils';

export const useDeleteCollectionModal = () => {
	const navigate = useNavigate();
	const match = useMatch('/collections/:collectionId');
	const collectionId = match?.params.collectionId;

	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleDeleteCollection = async () => {
		if (!collectionId) return;

		try {
			setIsFetching(true);

			const collectionService = new CollectionsService();

			await collectionService.deleteCollection(collectionId);

			navigate('/collections');

			showToast('success', 'Коллекция удалена');

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
		eventEmitter.on(EmitterEvents.MODAL_OPEN_DELETE_COLLECTION, openModal);

		return () => {
			eventEmitter.off(EmitterEvents.MODAL_OPEN_DELETE_COLLECTION, openModal);
		};
	}, [openModal]);

	return {
		isOpen,
		isFetching,
		closeModal,
		handleDeleteCollection,
	};
};
