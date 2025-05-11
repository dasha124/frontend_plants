import { useDetectPlant } from '@/features/detect/model';
import { UploadImage } from '@/features/detect/ui';
import { cn } from '@/shared/lib';
import { TrueFocus } from '@/shared/ui/ReactBits/animations';
import { RenderIf } from '@/shared/utils';
import { PlantItem } from '@/widgets/plantItem/ui';

export const Page = () => {
	const { typePlant, plants, setTypePlant, setPlants } = useDetectPlant();

	return (
		<div
			className={cn(
				'flex flex-col justify-center items-center gap-16 w-screen]',
			)}
		>
			<TrueFocus
				sentence='Определение типа растения'
				manualMode={false}
				blurAmount={5}
				borderColor={'#1668dc'}
				animationDuration={0.5}
				pauseBetweenAnimations={1}
			/>
			<UploadImage
				setTypePlant={setTypePlant}
				setPlants={setPlants}
			/>

			<RenderIf condition={!!typePlant && plants.length > 0}>
				<div className={'text-center'}>
					<span className={'text-2xl'}>Тип: </span>
					<span className={'text-2xl underline'}>{typePlant}</span>
				</div>

				<div className={cn('flex flex-wrap w-full justify-center gap-4 pt-16')}>
					{plants.map((plant) => (
						<PlantItem
							key={plant.id}
							plant={plant}
						/>
					))}
				</div>
			</RenderIf>
		</div>
	);
};
