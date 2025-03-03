import React from 'react';
import { Link } from 'react-router-dom';

import { TypePlantsInfo } from '@/entities/typePlants/model';

type Props = {
	typePlant: TypePlantsInfo;
};

export const TypePlantItem: React.FC<Props> = ({ typePlant }) => {
	return <Link to={`/plants/`}>{typePlant.name}</Link>;
};
