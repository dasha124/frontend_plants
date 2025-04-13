import { useState } from 'react';

import { TPlantInfoModel } from '@/entities/plant/model';

export const usePlantsCreate = () => {
	const [plantInfo] = useState<Partial<TPlantInfoModel> | null>(null);

	return { plantInfo };
};
