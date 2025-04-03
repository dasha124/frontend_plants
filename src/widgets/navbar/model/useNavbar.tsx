import {
	IconLayoutGridAdd,
	IconListDetails,
	IconLogin2,
	IconLogout2,
	IconPlant,
	IconUser,
} from '@tabler/icons-react';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
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
	{
		label: 'Коллекции',
		key: 'collections',
		icon: <IconLayoutGridAdd />,
	},
	{
		label: 'Аккаунт',
		key: 'account',
		icon: <IconUser />,
		children: [
			{ label: 'Войти', key: 'login', icon: <IconLogout2 /> },
			{ label: 'Выйти', key: 'logout', icon: <IconLogin2 /> },
		],
	},
];

export const useNavbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const onClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case 'typePlants':
				navigate('/type_plants');
				break;
			case 'plants':
				navigate('/plants');
				break;
			case 'collections':
				navigate('/collections');
				break;
			case 'login':
				navigate('/login');
				break;
			case 'logout':
				navigate('/signup');
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
