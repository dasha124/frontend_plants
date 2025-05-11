import { useCallback, useEffect, useState } from 'react';

import { PlantsService } from '@/entities/plant/api';
import { TypePlantsInfo } from '@/entities/typePlants/model';
import { showError } from '@/shared/utils';

export const useTypePlants = () => {
	const [typePlants, setTypePlants] = useState<TypePlantsInfo[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const loadTypePlants = useCallback(async () => {
		try {
			const plantsService = new PlantsService();

			const receivedTypePlants = await plantsService.getPlantTypes();
			setTypePlants(receivedTypePlants);
		} catch (error: unknown) {
			setTypePlants([]);

			showError(error);
		} finally {
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		loadTypePlants();
	}, [loadTypePlants]);

	return { typePlants, isLoaded };
};
