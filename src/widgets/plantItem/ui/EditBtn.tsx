import { EditOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react';

import { useEditBtn } from '@/widgets/plantItem/model';

type Props = {
	plantId: string;
};

export const EditBtn: React.FC<Props> = ({ plantId }) => {
	const { handleClick } = useEditBtn(plantId);

	return (
		<Popover
			content={'Редактировать'}
			placement={'bottom'}
		>
			<EditOutlined onClick={handleClick} />
		</Popover>
	);
};
