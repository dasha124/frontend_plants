import type { FormProps } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteUserAction, setUserAction } from '@/entities/user/model';
import { AuthorizationService } from '@/shared/api';
import { showToast } from '@/shared/utils';

export type TField = {
	username?: string;
	password?: string;
};

export const useLogin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isFetching, setIsFetching] = useState(false);

	const login = async (username: string, password: string) => {
		try {
			setIsFetching(true);

			const authorizationService = new AuthorizationService();

			const userInfo = await authorizationService.login(username, password);

			dispatch(setUserAction(userInfo));

			navigate('/plants');
		} catch (error: unknown) {
			dispatch(deleteUserAction());

			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		} finally {
			setIsFetching(false);
		}
	};

	const onFinish: FormProps<TField>['onFinish'] = async (values) => {
		if (!values.username || !values.password) {
			showToast('error', 'Укажите имя пользователя и пароль');
			return;
		}

		await login(values.username, values.password);
	};

	return { isFetching, onFinish };
};
