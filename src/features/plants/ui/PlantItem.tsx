import React from 'react';
import { Link } from 'react-router-dom';

import { TPlantShortInfo } from '@/features/plants/model';

type Props = {
	plant: TPlantShortInfo;
};

export const PlantItem: React.FC<Props> = ({ plant }) => {
	return <Link to={`/plants/${plant.id}`}>{plant.name}</Link>;
};
