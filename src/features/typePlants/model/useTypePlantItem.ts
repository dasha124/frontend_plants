import { useEnv } from '@/shared/contexts';

export const useTypePlantItem = () => {
	const { isDebugMode } = useEnv();

	return {
		isDebugMode,
	};
};
