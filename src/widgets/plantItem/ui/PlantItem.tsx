import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

import { TPlantShortInfo } from '@/entities/plant/model';
import { usePlantItem } from '@/widgets/plantItem/model';

type Props = {
	plant: TPlantShortInfo;
};

export const PlantItem: React.FC<Props> = ({ plant }) => {
	const { actions, handleCardClick } = usePlantItem(plant);

	return (
		<Card
			hoverable
			style={{ width: 240 }}
			cover={
				<img
					src={plant.image}
					alt={plant.name}
					style={{
						width: '100%',
						aspectRatio: '16 / 9',
						objectFit: 'cover',
					}}
				/>
			}
			actions={actions}
			onClick={handleCardClick}
		>
			<Meta title={plant.name} />
		</Card>
	);
};
