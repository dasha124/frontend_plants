import { TypePlantShortInfo } from '@/features/typePlants/model';

const items: TypePlantShortInfo[] = [
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
