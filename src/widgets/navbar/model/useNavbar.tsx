import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{
		label: 'Виды растений',
		key: 'typePlants',
		icon: <AppstoreOutlined />,
	},
	{
		label: 'Растения',
		key: 'plants',
		icon: <MailOutlined />,
	},
	// {
	// 	label: 'Мои коллекции',
	// 	key: 'SubMenu',
	// 	icon: <SettingOutlined />,
	// 	children: [
	// 		{
	// 			type: 'group',
	// 			label: 'Item 1',
	// 			children: [
	// 				{ label: 'Option 1', key: 'setting:1' },
	// 				{ label: 'Option 2', key: 'setting:2' },
	// 			],
	// 		},
	// 		{
	// 			type: 'group',
	// 			label: 'Item 2',
	// 			children: [
	// 				{ label: 'Option 3', key: 'setting:3' },
	// 				{ label: 'Option 4', key: 'setting:4' },
	// 			],
	// 		},
	// 	],
	// },
	// {
	// 	key: 'alipay',
	// 	label: (
	// 		<a
	// 			href='https://ant.design'
	// 			target='_blank'
	// 			rel='noopener noreferrer'
	// 		>
	// 			Navigation Four - Link
	// 		</a>
	// 	),
	// },
];

export const useNavbar = () => {
	const navigate = useNavigate();

	const [item, setItem] = useState('');

	const onClick: MenuProps['onClick'] = (e) => {
		setItem(e.key);
		switch (e.key) {
			case 'typePlants':
				navigate('/type_plants');
				break;
			case 'plants':
				navigate('/plants');
				break;
		}
	};

	return { onClick, item, items };
};
