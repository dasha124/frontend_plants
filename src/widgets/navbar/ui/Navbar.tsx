import { Menu } from 'antd';
import React from 'react';

import { useNavbar } from '@/widgets/navbar/model';

export const Navbar = React.memo(() => {
	const { onClick, getActiveKey, items } = useNavbar();

	return (
		<div className={'fixed top-0 left-0 z-50 w-full'}>
			<Menu
				onClick={onClick}
				selectedKeys={getActiveKey()}
				mode={'horizontal'}
				items={items}
			/>
		</div>
	);
});

Navbar.displayName = 'Navbar';
