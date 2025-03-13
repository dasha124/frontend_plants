import { Collapse } from 'antd';
import React from 'react';

import { usePlant } from '@/features/plant/model';
import { RenderIf } from '@/shared/utils';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	const { isLoaded, plantInfo, properties } = usePlant(id);

	return (
		<RenderIf condition={isLoaded}>
			<h1
				className={
					'p-4 bg-zinc-950 text-white text-center text-4xl font-bold mt-10'
				}
			>
				{plantInfo?.name}
			</h1>
			<Collapse
				items={properties}
				className={'text-white'}
			/>
		</RenderIf>
	);
};
