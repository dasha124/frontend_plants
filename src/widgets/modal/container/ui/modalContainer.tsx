import { AddPlantToCollectionModal } from '@/widgets/modal/addPlantToCollection';
import { CreateCollectionModal } from '@/widgets/modal/createCollection';
import { DeleteCollectionModal } from '@/widgets/modal/deleteCollection';
import { DeletePlantModal } from '@/widgets/modal/deletePlant';

export const ModalContainer = () => {
	return (
		<>
			<CreateCollectionModal />
			<DeleteCollectionModal />
			<AddPlantToCollectionModal />
			<DeletePlantModal />
		</>
	);
};
