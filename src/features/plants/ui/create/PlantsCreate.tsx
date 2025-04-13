import { usePlantsCreate } from '@/features/plants/model';

export const PlantsCreate = () => {
	const { plantInfo } = usePlantsCreate();

	return (
		<h1 className={'text-center text-4xl font-bold'}>
			Create Plant {plantInfo?.name}
		</h1>
	);
};
