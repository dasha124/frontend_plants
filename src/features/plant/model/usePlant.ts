import { useCallback, useEffect, useState } from 'react';

import { PlantsService } from '@/entities/plant/api';
import { PlantInfo } from '@/entities/plant/model';
import { showToast } from '@/shared/utils';

export const usePlant = (id: string) => {
	const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const loadPlantInfo = useCallback(async (id: string) => {
		try {
			const plantsService = new PlantsService();

			const plant = await plantsService.getPlantInfo(id);
			setPlantInfo(plant);
		} catch (error: unknown) {
			setPlantInfo(null);

			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		} finally {
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		loadPlantInfo(id);
	}, [id, loadPlantInfo]);

	return { plantInfo, isLoaded };
};
