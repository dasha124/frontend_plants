import { TPlantShortInfo } from '@/features/plants/model';

const items: TPlantShortInfo[] = [
	{
		id: '1',
		name: 'Роза',
	},
	{
		id: '2',
		name: 'Слива',
	},
];

export const usePlants = () => {
	return { items };
};
