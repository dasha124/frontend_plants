import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useEditBtn = (plantId: string) => {
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		navigate(`/plants/${plantId}?edit=true`);
	};

	return { handleClick };
};
