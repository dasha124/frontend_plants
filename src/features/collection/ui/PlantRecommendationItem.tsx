import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';

import { TPlantRecommendation } from '@/entities/plant/model';

type Props = {
	plant: TPlantRecommendation;
};

export const PlantRecommendationItem: React.FC<Props> = ({ plant }) => {
	return (
		<Link to={`/plants/${plant.id}`}>
			<Card
				hoverable
				style={{ width: 480 }}
			>
				<Meta title={<span className={'text-xl'}>{plant.name}</span>} />
			</Card>
		</Link>
	);
};
