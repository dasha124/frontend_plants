import { useSearchParams } from 'react-router-dom';

import { EmitterEvents, emitEvent } from '@/shared/utils';

export const usePlantsSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearch = (value: string) => {
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set('plant_name', value);
		} else {
			params.delete('plant_name');
		}

		setSearchParams(params);

		// eslint-disable-next-line no-undef
		queueMicrotask(() => {
			emitEvent(EmitterEvents.BUTTON_CLICK_PLANTS_SEARCH);
		});
	};

	return {
		searchValue: searchParams.get('plant_name') || '',
		handleSearch,
	};
};
