'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthorizationService } from '@/entities/user/api';
import { setUserAction } from '@/entities/user/model';

export const useBeforeRender = () => {
	const dispatch = useDispatch();

	const [canRender, setCanRender] = useState(false);

	const authorizationService = new AuthorizationService();

	const checkAuthorization = async () => {
		try {
			const user = await authorizationService.check();
			dispatch(setUserAction(user));
		} catch {
			// TODO
		}
	};

	const beforeRender = async () => {
		await checkAuthorization();
		// Даем всем настройкам установиться, затем пропускаем дальше
		// eslint-disable-next-line no-undef
		setTimeout(() => setCanRender(true), 500);
	};

	useEffect(() => {
		beforeRender();

		// Монтирование
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { canRender };
};
