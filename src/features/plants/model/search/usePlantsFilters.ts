import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
	EPlantType,
	EPlantClass,
	EPlantSubclass,
} from '@/entities/plant/model';
import { selectCurrentUser } from '@/entities/user/model';
import { TPlantSearchParams } from '@/features/plants/model';

export const usePlantsFilters = () => {
	const user = useSelector(selectCurrentUser);

	const [searchParams, setSearchParams] = useSearchParams();

	const [open, setOpen] = useState(false);

	const isAdmin = !!user?.isSuperuser;

	const typeOptionValues = useMemo(
		() =>
			Object.values(EPlantType).map((key) => ({
				value: key,
				label: key,
			})),
		[],
	);

	const classOptionValues = useMemo(
		() =>
			Object.values(EPlantClass).map((key) => ({
				value: key,
				label: key,
			})),
		[],
	);

	const subclassOptionValues = useMemo(
		() =>
			Object.values(EPlantSubclass).map((key) => ({
				value: key,
				label: key,
			})),
		[],
	);

	const params = useMemo((): TPlantSearchParams => {
		return {
			no_toxic:
				(searchParams.get('no_toxic') as TPlantSearchParams['no_toxic']) ||
				undefined,
			water:
				(searchParams.get('water') as TPlantSearchParams['water']) || undefined,
			status:
				(searchParams.get('status') as TPlantSearchParams['status']) ||
				undefined,
			type: searchParams.get('type') || undefined,
			class: searchParams.get('class') || undefined,
			subclass: searchParams.get('subclass') || undefined,
		};
	}, [searchParams]);

	const updateParams = useCallback(
		(params: Partial<TPlantSearchParams>) => {
			const newParams = new URLSearchParams(searchParams);

			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					newParams.set(key, value);
				} else {
					newParams.delete(key);
				}
			});

			setSearchParams(newParams);
		},
		[searchParams, setSearchParams],
	);

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
	};

	const handleTypeChange = (value: string | undefined) => {
		updateParams({ type: value });
	};

	const handleClassChange = (value: string | undefined) => {
		updateParams({ class: value });
	};

	const handleSubclassChange = (value: string | undefined) => {
		updateParams({ subclass: value });
	};

	const handleWaterChange = (checked: boolean) => {
		updateParams({ water: checked ? 'обильный' : undefined });
	};

	const handleToxicChange = (checked: boolean) => {
		updateParams({ no_toxic: checked ? 'yes' : undefined });
	};

	const handleStatusChange = (checked: boolean) => {
		updateParams({ status: checked ? 'Удалено' : undefined });
	};

	return {
		isAdmin,
		open,
		params,
		typeOptionValues,
		classOptionValues,
		subclassOptionValues,
		handleOpenChange,
		handleTypeChange,
		handleClassChange,
		handleSubclassChange,
		handleWaterChange,
		handleToxicChange,
		handleStatusChange,
	};
};
