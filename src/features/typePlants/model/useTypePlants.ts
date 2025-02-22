import { TTypePlantShortInfo } from '@/features/typePlants/model';

const items: TTypePlantShortInfo[] = [
	{
		id: '1',
		name: 'Розы',
	},
	{
		id: '2',
		name: 'Сливы',
	},
	{
		id: '3',
		name: 'Трава',
	},
];

export const useTypePlants = () => {
	return { items };
};
