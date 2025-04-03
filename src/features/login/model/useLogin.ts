import type { FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { TField } from '@/features/login/model';
import { AuthorizationService } from '@/shared/api/services';
import { showToast } from '@/shared/utils';

export const useLogin = () => {
	const navigate = useNavigate();

	const login = async (username: string, password: string) => {
		try {
			const authorizationService = new AuthorizationService();

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const res = await authorizationService.login(username, password);

			navigate('/plants');
		} catch (error: unknown) {
			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		}
	};

	const onFinish: FormProps<TField>['onFinish'] = (values) => {
		if (!values.username || !values.password) {
			showToast('error', 'Укажите имя пользователя и пароль');
			return;
		}

		login(values.username, values.password);
	};

	return { onFinish };
};
