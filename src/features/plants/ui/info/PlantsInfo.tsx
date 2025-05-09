import { usePlantsInfo } from '@/features/plants/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { PlantItem } from '@/widgets/plantItem/ui';

export const PlantsInfo = () => {
	const { plants, isLoaded } = usePlantsInfo();

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-wrap w-full justify-center gap-4')}
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
