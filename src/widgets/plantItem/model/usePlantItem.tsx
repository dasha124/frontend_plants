import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { TPlantShortInfo } from '@/entities/plant/model';
import { selectIsSuperuser } from '@/entities/user/model';
import { AddBtn, DeleteBtn, EditBtn } from '@/widgets/plantItem/ui';

export const usePlantItem = (plant: TPlantShortInfo) => {
	const navigate = useNavigate();
	const location = useLocation();

	const isSuperuser = useSelector(selectIsSuperuser);

	const actions: React.ReactNode[] = useMemo(() => {
		let items: React.ReactNode[] = [];

		const path = location.pathname.split('/').slice(0, 2).join('/');
		switch (path) {
			case '/plants':
				items.push(isSuperuser ? <EditBtn /> : <AddBtn />);
				break;
			case '/collections':
				items.push(<DeleteBtn />);
				break;
			default:
				break;
		}

		return items;
	}, [isSuperuser, location]);

	const handleCardClick = () => navigate(`/plants/${plant.id}`);

	return { actions, handleCardClick };
};
