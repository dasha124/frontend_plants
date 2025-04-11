import { DeleteOutlined } from '@ant-design/icons';

export const DeleteBtn = () => {
	return (
		<DeleteOutlined
			key='delete'
			onClick={(e) => {
				e.stopPropagation();
			}}
		/>
	);
};
