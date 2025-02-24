import { Menu } from 'antd';

import { useNavbar } from '@/widgets/navbar/model';

export const Navbar = () => {
	const { onClick, getActiveKey, items } = useNavbar();

	return (
		<Menu
			onClick={onClick}
			selectedKeys={getActiveKey()}
			mode='horizontal'
			items={items}
		/>
	);
};
