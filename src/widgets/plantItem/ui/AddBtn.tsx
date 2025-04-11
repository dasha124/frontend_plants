import { PlusCircleOutlined } from '@ant-design/icons';

export const AddBtn = () => {
	return (
		<PlusCircleOutlined
			key='add'
			onClick={(e) => {
				e.stopPropagation();
			}}
		/>
	);
};
