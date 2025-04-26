import { useCallback, useEffect, useState } from 'react';

import { PlantsService } from '@/entities/plant/api';
import { TPlantShortInfo } from '@/entities/plant/model';
import { showError } from '@/shared/utils';

export const usePlantsInfo = () => {
	const [plants, setPlants] = useState<TPlantShortInfo[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const loadPlants = useCallback(async () => {
		try {
			const plantsService = new PlantsService();

			const items = await plantsService.getPlants();
			setPlants(items.map((item) => item.toShortInfo()));
		} catch (error: unknown) {
			setPlants([]);

			showError(error);
		} finally {
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		loadPlants();
	}, [loadPlants]);

	return { plants, isLoaded };
};
