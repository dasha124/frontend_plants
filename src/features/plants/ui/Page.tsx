import { usePlants } from '@/features/plants/model';
import { PlantItem } from '@/features/plants/ui';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';

export const Page = () => {
	const { plants, isLoaded } = usePlants();

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col gap-2')}
		>
			{plants.map((plant) => (
				<PlantItem
					key={plant.id}
					plant={plant}
				/>
			))}
		</RenderIf>
	);
};
