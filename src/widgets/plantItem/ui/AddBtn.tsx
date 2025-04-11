import { PlusCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react';

import { useAddBtn } from '@/widgets/plantItem/model';

type Props = {
	plantId: string;
};

export const AddBtn: React.FC<Props> = ({ plantId }) => {
	const { handleClick } = useAddBtn(plantId);

	return (
		<Popover
			content={'Добавить растение в коллекцию'}
			placement={'bottom'}
		>
			<PlusCircleOutlined onClick={handleClick} />
		</Popover>
	);
};
