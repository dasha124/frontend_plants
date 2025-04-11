import { EditOutlined } from '@ant-design/icons';

export const EditBtn = () => {
	return (
		<EditOutlined
			key='edit'
			onClick={(e) => {
				e.stopPropagation();
			}}
		/>
	);
};
