import { Button, Collapse, Descriptions } from 'antd';
import React from 'react';

import defaultImage from '@/assets/images/default-image.png';
import { usePlantInfo } from '@/features/plant/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';

type Props = {
	id: string;
};

export const PlantInfo: React.FC<Props> = ({ id }) => {
	const { isLoaded, plantInfo, mainFields, properties, handleDelete } =
		usePlantInfo(id);

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col p-4 gap-8')}
		>
			<h1 className={'text-center text-4xl font-bold'}>{plantInfo?.name}</h1>

			<div className={'flex flex-col md:flex-row gap-4'}>
				<img
					src={defaultImage || plantInfo?.image}
					alt={plantInfo?.name}
					className={'h-full'}
				/>

				<Descriptions column={1}>
					{mainFields?.map((item, index) => (
						<Descriptions.Item
							key={index}
							label={<span className={'text-xl font-bold'}>{item.label}</span>}
						>
							<span className={'text-xl'}>{item.value}</span>
						</Descriptions.Item>
					))}
				</Descriptions>
			</div>

			<div>
				<Button onClick={handleDelete}>Удалить</Button>
			</div>

			<Collapse items={properties} />
		</RenderIf>
	);
};
