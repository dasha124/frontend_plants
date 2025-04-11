import { Modal } from 'antd';
import React from 'react';

import { useAddPlantToCollectionModal } from '@/widgets/modal/addPlantToCollection';

export const AddPlantToCollectionModal: React.FC = () => {
	const { plantId, isOpen, isFetching, closeModal, handleAddToCollection } =
		useAddPlantToCollectionModal();

	return (
		<Modal
			title={`Добавление ${plantId} в коллекцию`}
			open={isOpen}
			onOk={handleAddToCollection}
			confirmLoading={isFetching}
			onCancel={closeModal}
		></Modal>
	);
};
