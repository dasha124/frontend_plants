import { usePlants } from '@/features/plants/model';
import { PlantsCreate, PlantsInfo } from '@/features/plants/ui';

export const Page = () => {
	const { isCreateMode } = usePlants();

	return isCreateMode ? <PlantsCreate /> : <PlantsInfo />;
};
