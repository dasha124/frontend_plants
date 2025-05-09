import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PlantsService } from '@/entities/plant/api';
import { TPlantShortInfo } from '@/entities/plant/model';
import { TPlantSearchParams } from '@/features/plants/model';
import { showError } from '@/shared/utils';
import { EmitterEvents, eventEmitter, onEvent } from '@/shared/utils';

export const usePlantsInfo = () => {
	const [searchParams] = useSearchParams();

	const [plants, setPlants] = useState<TPlantShortInfo[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const loadPlants = useCallback(async () => {
		try {
			const plantsService = new PlantsService();

			const params: TPlantSearchParams = {
				plant_name: searchParams.get('plant_name') || undefined,
				no_toxic: searchParams.get(
					'no_toxic',
				) as TPlantSearchParams['no_toxic'],
				water: searchParams.get('water') as TPlantSearchParams['water'],
				status: searchParams.get('status') as TPlantSearchParams['status'],
				type: searchParams.get('type') || undefined,
				class: searchParams.get('class') || undefined,
				subclass: searchParams.get('subclass') || undefined,
			};

			const items = await plantsService.getPlants(params);
			setPlants(items.map((item) => item.toShortInfo()));
		} catch (error: unknown) {
			setPlants([]);

			showError(error);
		} finally {
			setIsLoaded(true);
		}
	}, [searchParams]);

	useEffect(() => {
		loadPlants();
		// Mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onEvent(EmitterEvents.PLANTS_SEARCH, loadPlants);

		return () => {
			eventEmitter.off(EmitterEvents.PLANTS_SEARCH, loadPlants);
		};
	}, [loadPlants]);

	return { plants, isLoaded };
};
