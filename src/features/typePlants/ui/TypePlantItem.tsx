import React from 'react';
import { Link } from 'react-router-dom';

import { TypePlantShortInfo } from '@/features/typePlants/model';

type Props = {
	typePlant: TypePlantShortInfo;
};

export const TypePlantItem: React.FC<Props> = () => {
	return <Link to={`/plants/`}></Link>;
};
