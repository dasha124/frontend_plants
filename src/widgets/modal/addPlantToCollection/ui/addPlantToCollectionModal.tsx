import { Modal, Select } from 'antd';
import React from 'react';

import { useAddPlantToCollectionModal } from '@/widgets/modal/addPlantToCollection';

export const AddPlantToCollectionModal: React.FC = () => {
	const {
		collectionId,
		isOpen,
		isFetching,
		selectOptions,
		closeModal,
		handleFilter,
		handleAddToCollection,
		handleSelectCollection,
	} = useAddPlantToCollectionModal();

	return (
		<Modal
			title={'Добавление растения в коллекцию'}
			open={isOpen}
			onOk={handleAddToCollection}
			confirmLoading={isFetching}
			onCancel={closeModal}
		>
			<Select
				value={collectionId}
				placeholder={'Выберите коллекцию'}
				filterOption={handleFilter}
				options={selectOptions}
				onChange={handleSelectCollection}
				showSearch
				allowClear
			/>
		</Modal>
	);
};
