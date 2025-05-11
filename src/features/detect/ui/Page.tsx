import { cn } from '@/shared/lib';
import { UploadImage } from '@/shared/ui';
import { TrueFocus } from '@/shared/ui/ReactBits/animations';

export const Page = () => {
	return (
		<div
			className={cn(
				'flex flex-col justify-center items-center gap-16',
				'h-[calc(100vh-46px-2rem)] w-screen]',
			)}
		>
			<TrueFocus
				sentence='Определение типа растения'
				manualMode={false}
				blurAmount={5}
				borderColor={'#1668dc'}
				animationDuration={0.5}
				pauseBetweenAnimations={1.5}
			/>
			<UploadImage
				initialFile={null}
				fileName={'default'}
				setLink={() => {}}
				removeLink={() => {}}
			/>
		</div>
	);
};
