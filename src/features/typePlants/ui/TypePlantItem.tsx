import React from 'react';
import { Link } from 'react-router-dom';

import { TTypePlantShortInfo } from '@/features/typePlants/model';

type Props = {
	typePlant: TTypePlantShortInfo;
};

export const TypePlantItem: React.FC<Props> = ({ typePlant }) => {
	return <Link to={`/plants/`}>{typePlant.name}</Link>;
};
