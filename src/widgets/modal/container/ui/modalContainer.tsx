import { CreateCollectionModal } from '@/widgets/modal/createCollection';
import { DeleteCollectionModal } from '@/widgets/modal/deleteCollection';

export const ModalContainer = () => {
	return (
		<>
			<CreateCollectionModal />
			<DeleteCollectionModal />
		</>
	);
};
