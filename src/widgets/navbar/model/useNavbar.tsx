import {
	IconCirclePlus,
	IconLayout2,
	IconLayoutGridAdd,
	IconListDetails,
	IconLogin2,
	IconLogout2,
	IconPlant,
	IconUser,
} from '@tabler/icons-react';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
	deleteUserAction,
	selectIsAuthorized,
	selectIsSuperuser,
} from '@/entities/user/model';
import { AuthorizationService } from '@/shared/api';
import { EmitterEvents, eventEmitter, showToast } from '@/shared/utils';

type MenuItem = Required<MenuProps>['items'][number];

const getMenuItems = (
	isAuthorized: boolean,
	isSuperuser: boolean,
): MenuItem[] => [
	{
		label: 'Виды растений',
		key: 'typePlants',
		icon: <IconListDetails width={20} />,
	},
	{
		label: 'Растения',
		key: 'plants',
		icon: <IconPlant />,
	},
	...(isAuthorized && !isSuperuser
		? [
				{
					label: 'Коллекции',
					key: 'collections',
					icon: <IconLayoutGridAdd />,
					children: [
						{
							label: 'Мои коллекции',
							key: 'collections_my',
							icon: <IconLayout2 />,
						},
						{
							label: 'Создать',
							key: 'collections_create',
							icon: <IconCirclePlus />,
						},
					],
				},
			]
		: []),
	{
		label: 'Аккаунт',
		key: 'account',
		icon: <IconUser />,
		children: isAuthorized
			? [
					{
						label: 'Выйти',
						key: 'logout',
						icon: <IconLogout2 />,
					},
				]
			: [
					{
						label: 'Войти',
						key: 'login',
						icon: <IconLogin2 />,
					},
				],
	},
];

export const useNavbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const isAuthorized = useSelector(selectIsAuthorized);
	const isSuperuser = useSelector(selectIsSuperuser);

	const items = getMenuItems(isAuthorized, isSuperuser);

	const logout = async () => {
		const authorizationService = new AuthorizationService();

		try {
			await authorizationService.logout();
			dispatch(deleteUserAction());
			navigate('/login');
		} catch (error: unknown) {
			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		}
	};

	const onClick: MenuProps['onClick'] = async (e) => {
		switch (e.key) {
			case 'typePlants':
				navigate('/type_plants');
				break;
			case 'plants':
				navigate('/plants');
				break;
			case 'collections_my':
				navigate('/collections');
				break;
			case 'collections_create':
				eventEmitter.emit(EmitterEvents.MODAL_OPEN_CREATE_COLLECTION);
				break;
			case 'login':
				navigate('/login');
				break;
			case 'logout':
				await logout();
				break;
		}
	};

	const getActiveKey = () => {
		const path = location.pathname.split('/').slice(0, 2).join('/');
		switch (path) {
			case '/type_plants':
				return ['typePlants'];
			case '/plants':
				return ['plants'];
			case '/collections':
				return ['collections'];
			default:
				return [];
		}
	};

	return { onClick, getActiveKey, items };
};
