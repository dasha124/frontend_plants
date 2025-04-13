import { Input, Modal } from 'antd';
import React from 'react';

import { useCreateCollectionModal } from '@/widgets/modal/createCollection';

export const CreateCollectionModal: React.FC = () => {
	const {
		collectionName,
		isOpen,
		isFetching,
		closeModal,
		handleChangeCollectionName,
		handleCreateCollection,
	} = useCreateCollectionModal();

	return (
		<Modal
			title='Создание коллекции'
			open={isOpen}
			onOk={handleCreateCollection}
			confirmLoading={isFetching}
			onCancel={closeModal}
			okText={'Создать'}
		>
			<Input
				placeholder={'Название коллекции'}
				value={collectionName}
				onChange={handleChangeCollectionName}
				allowClear
			/>
		</Modal>
	);
};
