import React from 'react';

import { usePlant } from '@/features/plant/model';
import { RenderIf } from '@/shared/utils';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	const { plantInfo, isLoaded } = usePlant(id);

	return (
		<RenderIf condition={isLoaded}>
			<h1
				className={
					'p-4 bg-zinc-950 text-white text-center text-4xl font-bold mt-10'
				}
			>
				{JSON.stringify(plantInfo)}
			</h1>
		</RenderIf>
	);
};
