import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CollectionsService } from '@/entities/collection/api';
import {
	deleteCollectionAction,
	selectCollection,
	setCollectionAction,
} from '@/entities/collection/model';
import { emitEvent, EmitterEvents, showToast } from '@/shared/utils';

export const useCollection = (id: string) => {
	const dispatch = useDispatch();

	const collectionInfo = useSelector(selectCollection);

	const [isLoaded, setIsLoaded] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [collectionName, setCollectionName] = useState('');

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

	const loadCollectionInfo = useCallback(
		async (id: string) => {
			try {
				const collectionsService = new CollectionsService();

				const collection = await collectionsService.getCollectionInfo(id);

				dispatch(setCollectionAction(collection));
				setCollectionName(collection.name);
			} catch (error: unknown) {
				dispatch(deleteCollectionAction());

				if (error instanceof Error) {
					showToast('error', error.message);
				} else {
					showToast('error', 'Ошибка при выполнеии действия');
				}
			} finally {
				setIsLoaded(true);
			}
		},
		[dispatch],
	);

	const handleEditBtnClick = () => setIsEditMode(true);

	const handleChangeCollectionName = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setCollectionName(event.target.value);
	};

	const handleSaveCollectionName = async () => {
		if (collectionName.trim().length === 0) {
			showToast('error', 'Введите название коллекции');
			return;
		}

		try {
			const collectionsService = new CollectionsService();

			const collection = await collectionsService.updateCollectionName(
				id,
				collectionName.trim(),
			);

			dispatch(setCollectionAction(collection));
			setCollectionName(collection.name);

			setIsEditMode(false);
		} catch (error: unknown) {
			showToast(
				'error',
				error instanceof Error && error.message
					? error.message
					: 'Ошибка при выполнеии действия',
			);
		}
	};

	const handleDeleteCollection = () => {
		emitEvent(EmitterEvents.MODAL_OPEN_DELETE_COLLECTION);
	};

	useEffect(() => {
		loadCollectionInfo(id);
	}, [id, loadCollectionInfo]);

	return {
		isLoaded,
		isEditMode,
		collectionInfo,
		fields,
		collectionName,
		handleEditBtnClick,
		handleChangeCollectionName,
		handleSaveCollectionName,
		handleDeleteCollection,
	};
};
