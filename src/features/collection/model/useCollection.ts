import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CollectionsService } from '@/entities/collection/api';
import {
	deleteCollectionAction,
	selectCollection,
	setCollectionAction,
} from '@/entities/collection/model';
import { formatDate } from '@/entities/collection/utils';
import { TPlantRecommendation } from '@/entities/plant/model';
import { selectCurrentUser } from '@/entities/user/model';
import { RecommendationService } from '@/shared/api';
import { emitEvent, EmitterEvents, showError, showToast } from '@/shared/utils';

export const useCollection = (id: string) => {
	const dispatch = useDispatch();

	const user = useSelector(selectCurrentUser);
	const collectionInfo = useSelector(selectCollection);

	const [isLoaded, setIsLoaded] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [collectionName, setCollectionName] = useState('');
	const [plantRecommendations, setPlantRecommendations] = useState<
		TPlantRecommendation[]
	>([]);

	const fields = useMemo(
		() =>
			collectionInfo
				? [
						{
							key: '1',
							label: 'Дата создания',
							value: formatDate(
								collectionInfo.dateCreate,
								collectionInfo.timeCreate,
							),
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

				showError(error);
			} finally {
				setIsLoaded(true);
			}
		},
		[dispatch],
	);

	const loadRecommendations = async () => {
		if (plantRecommendations.length > 0) return;

		try {
			setIsFetching(true);

			const recommendationsService = new RecommendationService();

			const recommendations =
				await recommendationsService.getRecommendationsByCollection(id);

			setPlantRecommendations(recommendations);
		} catch (error: unknown) {
			setPlantRecommendations([]);

			showError(error);
		} finally {
			setIsFetching(false);
		}
	};

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
			showError(error);
		}
	};

	const handleDeleteCollection = () => {
		emitEvent(EmitterEvents.MODAL_OPEN_DELETE_COLLECTION);
	};

	useEffect(() => {
		loadCollectionInfo(id);
	}, [id, loadCollectionInfo]);

	return {
		isSuperuser: !!user?.isSuperuser,
		isLoaded,
		isFetching,
		isEditMode,
		collectionInfo,
		fields,
		collectionName,
		plantRecommendations,
		handleEditBtnClick,
		handleChangeCollectionName,
		handleSaveCollectionName,
		handleDeleteCollection,
		loadRecommendations,
	};
};
