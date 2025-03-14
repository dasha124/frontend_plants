import React from 'react';

import { useCollection } from '@/features/collection/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { PlantItem } from '@/widgets/plantItem/ui';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	const { isLoaded, collectionInfo } = useCollection(id);

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col p-4 gap-8')}
		>
			<h1 className={'text-white text-center text-4xl font-bold'}>
				{collectionInfo?.name}
			</h1>

			<div className={cn('flex flex-col')}>
				<span>
					Дата создания: {collectionInfo?.dateCreate}{' '}
					{collectionInfo?.timeCreate}
				</span>
				<span>Статус: {collectionInfo?.status}</span>
			</div>

			<div className={cn('flex flex-wrap w-full justify-center gap-4')}>
				{collectionInfo?.plants.map((plant) => (
					<PlantItem
						key={plant.id}
						plant={plant}
					/>
				))}
			</div>
		</RenderIf>
	);
};
