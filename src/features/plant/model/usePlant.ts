import { useSearchParams } from 'react-router-dom';

export const usePlant = () => {
	const [searchParams] = useSearchParams();
	const isEditMode = searchParams.get('edit') === 'true';

	return {
		isEditMode,
	};
};
