import React from 'react';

import { usePlant } from '@/features/plant/model';
import { PlantEdit, PlantInfo } from '@/features/plant/ui';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	const { isEditMode } = usePlant();

	return isEditMode ? <PlantEdit id={id} /> : <PlantInfo id={id} />;
};
