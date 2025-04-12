import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectIsAuthorized } from '@/entities/user/model';
import { emitEvent, EmitterEvents, showToast } from '@/shared/utils';

export const useAddBtn = (plantId: string) => {
	const navigate = useNavigate();

	const isAuthorized = useSelector(selectIsAuthorized);

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		if (!isAuthorized) {
			showToast('info', 'Авторизуйтесь, чтобы добавить растение в коллекцию');
			navigate('/login');

			return;
		}

		emitEvent(EmitterEvents.MODAL_OPEN_PLANT_ADD_TO_COLLECTION, { plantId });
	};

	return { handleClick };
};
