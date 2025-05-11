import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';

import { TypePlantsInfo } from '@/entities/typePlants/model';

type Props = {
	typePlant: TypePlantsInfo;
};

export const TypePlantItem: React.FC<Props> = ({ typePlant }) => {
	return (
		<Link to={`/plants/?type=${typePlant.name}`}>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						src={typePlant.image}
						alt={typePlant.name}
						style={{
							width: '100%',
							aspectRatio: '16 / 9',
							objectFit: 'cover',
						}}
					/>
				}
			>
				<Meta title={typePlant.name} />
			</Card>
		</Link>
	);
};
