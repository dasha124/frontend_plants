import React from 'react';

import { usePlantEdit } from '@/features/plant/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';

type Props = {
	id: string;
};

export const PlantEdit: React.FC<Props> = ({ id }) => {
	const { isLoaded, plantInfo } = usePlantEdit(id);

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col p-4 gap-8')}
		>
			<h1 className={'text-center text-4xl font-bold'}>{plantInfo?.name}</h1>
		</RenderIf>
	);
};
