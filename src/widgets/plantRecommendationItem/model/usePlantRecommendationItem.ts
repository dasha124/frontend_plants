import { useEnv } from '@/shared/contexts';

export const usePlantRecommendationItem = () => {
	const { isDebugMode } = useEnv();

	return { isDebugMode };
};
