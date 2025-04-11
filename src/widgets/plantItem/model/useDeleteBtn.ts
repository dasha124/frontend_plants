/* eslint-disable no-undef */

import React from 'react';

export const useDeleteBtn = (plantId: string, collectionId: string | null) => {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		if (!collectionId) return;

		console.log(`Deleting plant ${plantId} from collection ${collectionId}`);
	};

	return { handleClick };
};
