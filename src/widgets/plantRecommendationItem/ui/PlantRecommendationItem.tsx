import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';

import defaultImage from '@/assets/images/default-image.png';
import { TPlantRecommendation } from '@/entities/plant/model';
import { usePlantRecommendationItem } from '@/widgets/plantRecommendationItem/model';

type Props = {
	plant: TPlantRecommendation;
};

export const PlantRecommendationItem: React.FC<Props> = ({ plant }) => {
	const { isDebugMode } = usePlantRecommendationItem();

	return (
		<Link to={`/plants/${plant.id}`}>
			<Card
				hoverable
				style={{ width: 360 }}
				cover={
					<img
						src={isDebugMode ? defaultImage : plant?.image}
						alt={plant.name}
						style={{
							width: '100%',
							aspectRatio: '16 / 9',
							objectFit: 'cover',
						}}
					/>
				}
			>
				<Meta title={<span className={'text-lg'}>{plant.name}</span>} />
			</Card>
		</Link>
	);
};
