import {
	IconCirclePlus,
	IconLayout2,
	IconLayoutGridAdd,
	IconListDetails,
	IconLogin2,
	IconLogout2,
	IconPlant,
	IconUser,
	IconInfoCircle,
	IconEyeSearch,
} from '@tabler/icons-react';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
	deleteUserAction,
	selectCurrentUser,
	UserInfo,
} from '@/entities/user/model';
import { AuthorizationService } from '@/shared/api';
import { emitEvent, EmitterEvents, showError } from '@/shared/utils';

type MenuItem = Required<MenuProps>['items'][number];

const getMenuItems = (user: UserInfo | null): MenuItem[] => [
	{
		label: 'Виды растений',
		key: 'typePlants',
		icon: <IconListDetails width={20} />,
	},
	...(user?.isSuperuser
		? [
				{
					label: 'Растения',
					key: 'plants_menu',
					icon: <IconPlant />,
					children: [
						{
							label: 'Список растений',
							key: 'plants',
							icon: <IconPlant />,
						},
						{
							label: 'Создать',
							key: 'plants_create',
							icon: <IconCirclePlus />,
						},
					],
				},
			]
		: [
				{
					label: 'Растения',
					key: 'plants',
					icon: <IconPlant />,
				},
				{
					label: 'Определить',
					key: 'detect_plant',
					icon: <IconEyeSearch />,
				},
			]),

	...(user && !user.isSuperuser
		? [
				{
					label: 'Коллекции',
					key: 'collections_menu',
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
		children: user
			? [
					{
						disabled: true,
						label: user.name,
						key: 'username',
						icon: <IconInfoCircle />,
					},
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

	const user = useSelector(selectCurrentUser);

	const items = getMenuItems(user);

	const logout = async () => {
		const authorizationService = new AuthorizationService();

		try {
			await authorizationService.logout();
			dispatch(deleteUserAction());
			navigate('/login');
		} catch (error: unknown) {
			showError(error);
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
			case 'plants_create':
				navigate('/plants?create=true');
				break;
			case 'detect_plant':
				navigate('/detect');
				break;
			case 'collections_my':
				navigate('/collections');
				break;
			case 'collections_create':
				emitEvent(EmitterEvents.MODAL_OPEN_CREATE_COLLECTION);
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
			case '/detect':
				return ['detect_plant'];
			case '/collections':
				return ['collections'];
			default:
				return [];
		}
	};

	return { onClick, getActiveKey, items };
};
