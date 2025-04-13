import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlantsService } from '@/entities/plant/api';
import {
	EmitterEvents,
	eventEmitter,
	onEvent,
	showToast,
} from '@/shared/utils';

export const useDeletePlantModal = () => {
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [plantId, setPlantId] = useState<string | null>(null);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = () => {
		setIsOpen(false);
		setPlantId(null);
	};

	const handleDelete = async () => {
		if (!plantId) {
			showToast('error', 'Не выбрано растение');

			return;
		}

		try {
			setIsFetching(true);

			const plantsService = new PlantsService();

			await plantsService.deletePlant(plantId);

			navigate('/plants');

			showToast('success', 'Растение удалено');

			closeModal();
		} catch (error: unknown) {
			showToast(
				'error',
				error instanceof Error
					? error.message
					: 'Ошибка при выполнеии действия',
			);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		onEvent(EmitterEvents.MODAL_OPEN_DELETE_PLANT, (payload) => {
			setPlantId(payload.plantId);
			openModal();
		});

		return () => {
			eventEmitter.off(EmitterEvents.MODAL_OPEN_DELETE_PLANT, setPlantId);
		};
	}, [openModal]);

	return {
		plantId,
		isOpen,
		isFetching,
		closeModal,
		handleDelete,
	};
};
