import { usePlants } from '@/features/plants/model';
import { PlantItem } from '@/features/plants/ui/PlantItem.tsx';

export const Page = () => {
	const { items } = usePlants();

	return items.map((item) => (
		<PlantItem
			key={item.id}
			plant={item}
		/>
	));
};
