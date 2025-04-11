import React from 'react';

import { emitEvent, EmitterEvents } from '@/shared/utils';

export const useAddBtn = (plantId: string) => {
	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		emitEvent(EmitterEvents.MODAL_OPEN_PLANT_ADD_TO_COLLECTION, { plantId });
	};

	return { handleClick };
};
