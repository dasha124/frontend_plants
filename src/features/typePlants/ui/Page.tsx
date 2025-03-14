import { useTypePlants } from '@/features/typePlants/model';
import { TypePlantItem } from '@/features/typePlants/ui/';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';

export const Page = () => {
	const { typePlants, isLoaded } = useTypePlants();

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-wrap w-full justify-center gap-4')}
		>
			{typePlants.map((item) => (
				<TypePlantItem
					key={item.id}
					typePlant={item}
				/>
			))}
		</RenderIf>
	);
};
