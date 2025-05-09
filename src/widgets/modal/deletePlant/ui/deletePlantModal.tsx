import { Modal } from 'antd';

import { useDeletePlantModal } from '@/widgets/modal/deletePlant';

export const DeletePlantModal = () => {
	const { isOpen, isFetching, closeModal, handleDelete } =
		useDeletePlantModal();

	return (
		<Modal
			title='Удалить растение?'
			open={isOpen}
			onOk={handleDelete}
			confirmLoading={isFetching}
			onCancel={closeModal}
			okText={'Да'}
			okType={'danger'}
		>
			<span>Вы уверены, что хотите удалить растение?</span>
		</Modal>
	);
};
