import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CollectionsService } from '@/entities/collection/api';
import {
	EmitterEvents,
	eventEmitter,
	onEvent,
	showError,
	showToast,
} from '@/shared/utils';

export const useCreateCollectionModal = () => {
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [collectionName, setCollectionName] = useState('');

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = () => {
		setIsOpen(false);
		setCollectionName('');
	};

	const handleChangeCollectionName = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setCollectionName(event.target.value);
	};

	const handleCreateCollection = async () => {
		if (collectionName.trim().length === 0) {
			showToast('error', 'Не указано название коллекции');

			return;
		}

		try {
			setIsFetching(true);

			const collectionService = new CollectionsService();

			const collection = await collectionService.createCollection(
				collectionName.trim(),
			);

			navigate(`/collections/${collection.id}`);

			showToast('success', 'Коллекция успешно создана');

			closeModal();
		} catch (error: unknown) {
			showError(error);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		onEvent(EmitterEvents.MODAL_OPEN_CREATE_COLLECTION, openModal);

		return () => {
			eventEmitter.off(EmitterEvents.MODAL_OPEN_CREATE_COLLECTION, openModal);
		};
	}, [openModal]);

	return {
		collectionName,
		isOpen,
		isFetching,
		closeModal,
		handleChangeCollectionName,
		handleCreateCollection,
	};
};
