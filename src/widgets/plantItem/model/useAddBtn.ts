/* eslint-disable no-undef */

import React from 'react';

export const useAddBtn = (plantId: string) => {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		console.log(`Adding plant ${plantId} to collection`);
	};

	return { handleClick };
};
