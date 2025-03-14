import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';

import defaultImage from '@/assets/images/default-image.png';
import { TPlantShortInfo } from '@/entities/plant/model';

type Props = {
	plant: TPlantShortInfo;
};

export const PlantItem: React.FC<Props> = ({ plant }) => {
	return (
		<Link to={`/plants/${plant.id}`}>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						src={defaultImage || plant.image}
						alt={plant.name}
					/>
				}
			>
				<Meta title={plant.name} />
			</Card>
		</Link>
	);
};
