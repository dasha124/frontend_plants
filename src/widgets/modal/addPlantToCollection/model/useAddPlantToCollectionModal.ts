import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CollectionsService } from '@/entities/collection/api';
import {
	deleteCollectionsAction,
	selectCollections,
	setCollectionsAction,
} from '@/entities/collection/model';
import {
	EmitterEvents,
	eventEmitter,
	onEvent,
	showError,
	showToast,
} from '@/shared/utils';

type TSelectOption = {
	label: string;
	value: string;
};

export const useAddPlantToCollectionModal = () => {
	const dispatch = useDispatch();

	const collections = useSelector(selectCollections);

	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [plantId, setPlantId] = useState<string | null>(null);
	const [collectionId, setCollectionId] = useState<string | null>(null);

	const selectOptions: TSelectOption[] = useMemo(
		() =>
			collections.map((collection) => ({
				value: collection.id,
				label: collection.name,
			})),
		[collections],
	);

	const loadCollections = useCallback(async () => {
		try {
			const collectionsService = new CollectionsService();

			const items = await collectionsService.getCollections();

			dispatch(setCollectionsAction(items.map((item) => item.toShortInfo())));
		} catch (error: unknown) {
			dispatch(deleteCollectionsAction());

			showError(error);
		}
	}, [dispatch]);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = () => {
		setIsOpen(false);
		setPlantId(null);
		setCollectionId(null);
	};

	const handleSelectCollection = (collectionId?: string) => {
		setCollectionId(collectionId || null);
	};

	const handleFilter = (input: string, option?: TSelectOption) =>
		(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
			showError(error);
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

	useEffect(() => {
		loadCollections();
	}, [loadCollections]);

	return {
		plantId,
		collectionId,
		isOpen,
		isFetching,
		selectOptions,
		closeModal,
		handleFilter,
		handleAddToCollection,
		handleSelectCollection,
	};
};
