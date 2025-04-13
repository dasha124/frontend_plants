import { useSearchParams } from 'react-router-dom';

export const usePlants = () => {
	const [searchParams] = useSearchParams();
	const isCreateMode = searchParams.get('create') === 'true';

	return { isCreateMode };
};
