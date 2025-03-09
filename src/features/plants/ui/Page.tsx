import { usePlants } from '@/features/plants/model';
import { PlantItem } from '@/features/plants/ui';
import { RenderIf } from '@/shared/utils';

export const Page = () => {
	const { plants, isLoaded } = usePlants();

	return (
		<RenderIf condition={isLoaded}>
			{plants.map((plant) => (
				<PlantItem
					key={plant.id}
					plant={plant}
				/>
			))}
		</RenderIf>
	);
};
