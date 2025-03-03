import { useCallback, useEffect, useState } from 'react';

import { PlantsService } from '@/entities/plant/api';
import { TPlantShortInfo } from '@/entities/plant/model';
import { showToast } from '@/shared/utils';

export const usePlants = () => {
	const [plants, setPlants] = useState<TPlantShortInfo[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const loadPlants = useCallback(async () => {
		try {
			const plantsService = new PlantsService();

			const items = await plantsService.getPlants();
			setPlants(items);
		} catch (error: unknown) {
			setPlants([]);

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
		loadPlants();
	}, [loadPlants]);

	return { plants, isLoaded };
};
