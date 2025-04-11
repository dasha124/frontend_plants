import { DeleteOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react';

import { useDeleteBtn } from '@/widgets/plantItem/model';

type Props = {
	plantId: string;
	collectionId: string | null;
};

export const DeleteBtn: React.FC<Props> = ({ plantId, collectionId }) => {
	const { handleClick } = useDeleteBtn(plantId, collectionId);

	return (
		<Popover
			content={'Удалить растение из коллекции'}
			placement={'bottom'}
		>
			<DeleteOutlined onClick={handleClick} />
		</Popover>
	);
};
