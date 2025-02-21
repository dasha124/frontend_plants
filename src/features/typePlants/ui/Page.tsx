import { useTypePlants } from '@/features/typePlants/model';
import { TypePlantItem } from '@/features/typePlants/ui/TypePlantItem.tsx';

export const Page = () => {
	const { items } = useTypePlants();

	return items.map((item) => (
		<TypePlantItem
			key={item.id}
			typePlant={item}
		/>
	));
};
