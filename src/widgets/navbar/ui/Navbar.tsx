import { Menu } from 'antd';

import { useNavbar } from '@/widgets/navbar/model';

export const Navbar = () => {
	const { onClick, item, items } = useNavbar();

	return (
		<Menu
			onClick={onClick}
			selectedKeys={[item]}
			mode='horizontal'
			items={items}
		/>
	);
};
