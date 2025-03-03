import { useTypePlants } from '@/features/typePlants/model';
import { TypePlantItem } from '@/features/typePlants/ui/';
import { RenderIf } from '@/shared/utils';

export const Page = () => {
	const { typePlants, isLoaded } = useTypePlants();

	return (
		<RenderIf condition={isLoaded}>
			{typePlants.map((item) => (
				<TypePlantItem
					key={item.id}
					typePlant={item}
				/>
			))}
		</RenderIf>
	);
};
