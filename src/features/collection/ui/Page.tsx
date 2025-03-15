import { Descriptions, Divider } from 'antd';
import React from 'react';

import { useCollection } from '@/features/collection/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { PlantItem } from '@/widgets/plantItem/ui';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	const { isLoaded, collectionInfo, fields } = useCollection(id);

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col p-4 gap-8')}
		>
			<h1 className={'text-white text-center text-4xl font-bold'}>
				{collectionInfo?.name}
			</h1>

			<Descriptions column={1}>
				{fields.map((item, index) => (
					<Descriptions.Item
						key={index}
						label={<span className={'text-xl font-bold'}>{item.label}</span>}
					>
						<span className={'text-xl'}>{item.value}</span>
					</Descriptions.Item>
				))}
			</Descriptions>

			<Divider orientation={'left'}>Растения</Divider>

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
