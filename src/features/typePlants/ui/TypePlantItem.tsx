import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';

import defaultImage from '@/assets/images/default-image.png';
import { TypePlantsInfo } from '@/entities/typePlants/model';

type Props = {
	typePlant: TypePlantsInfo;
};

export const TypePlantItem: React.FC<Props> = ({ typePlant }) => {
	return (
		<Link to={`/plants/`}>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						src={defaultImage || typePlant.image}
						alt={typePlant.name}
					/>
				}
			>
				<Meta title={typePlant.name} />
			</Card>
		</Link>
	);
};
