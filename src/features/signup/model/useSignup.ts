import type { FormProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthorizationService } from '@/shared/api';
import { showError, showToast } from '@/shared/utils';

export type TField = {
	username?: string;
	password?: string;
	passwordRepeat?: string;
};

export const useSignup = () => {
	const navigate = useNavigate();

	const [isFetching, setIsFetching] = useState(false);

	const signup = async (username: string, password: string) => {
		try {
			setIsFetching(true);

			const authorizationService = new AuthorizationService();

			await authorizationService.signup(username, password);

			showToast('success', 'Пользователь успешно зарегистрирован');

			navigate('/login');
		} catch (error: unknown) {
			showError(error);
		} finally {
			setIsFetching(false);
		}
	};

	const onFinish: FormProps<TField>['onFinish'] = async (values) => {
		if (!values.username || !values.password || !values.passwordRepeat) {
			showToast('error', 'Укажите имя пользователя и пароль');
			return;
		}

		if (values.password !== values.passwordRepeat) {
			showToast('error', 'Пароли не совпадают');
			return;
		}

		await signup(values.username, values.password);
	};

	return { isFetching, onFinish };
};
