import { Modal } from 'antd';
import React from 'react';

import { useDeleteCollectionModal } from '@/widgets/modal/deleteCollection';

export const DeleteCollectionModal: React.FC = () => {
	const { isOpen, isFetching, closeModal, handleDeleteCollection } =
		useDeleteCollectionModal();

	return (
		<Modal
			title='Удалить коллекцию?'
			open={isOpen}
			onOk={handleDeleteCollection}
			confirmLoading={isFetching}
			onCancel={closeModal}
		>
			<span>
				Вы уверены, что хотите удалить коллекцию? Это действие нельзя будет
				отменить
			</span>
		</Modal>
	);
};
