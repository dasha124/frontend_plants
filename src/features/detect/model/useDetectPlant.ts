import { useState } from 'react';

import { TPlantShortInfo } from '@/entities/plant/model';

export const useDetectPlant = () => {
	const [typePlant, setTypePlant] = useState<string | null>(null);
	const [plants, setPlants] = useState<TPlantShortInfo[]>([]);

	return {
		typePlant,
		plants,
		setTypePlant,
		setPlants,
	};
};
