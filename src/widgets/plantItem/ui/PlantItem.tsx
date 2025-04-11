import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

import defaultImage from '@/assets/images/default-image.png';
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
					src={defaultImage || plant.image}
					alt={plant.name}
				/>
			}
			actions={actions}
			onClick={handleCardClick}
		>
			<Meta title={plant.name} />
		</Card>
	);
};
