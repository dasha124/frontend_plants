import type { FormProps } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlantsService } from '@/entities/plant/api';
import {
	EPlantClass,
	EPlantSubclass,
	EPlantType,
	PlantInfo,
	TPlantCreate,
} from '@/entities/plant/model';
import { showToast } from '@/shared/utils';

export type TField = Partial<TPlantCreate>;

export const usePlantsCreate = () => {
	const navigate = useNavigate();

	const [isFetching, setIsFetching] = useState(false);

	const classOptionValues = useMemo(
		() => Object.values(EPlantClass).map((key) => ({ value: key, label: key })),
		[],
	);

	const subClassOptionValues = useMemo(
		() =>
			Object.values(EPlantSubclass).map((key) => ({ value: key, label: key })),
		[],
	);

	const typeOptionValues = useMemo(
		() => Object.values(EPlantType).map((key) => ({ value: key, label: key })),
		[],
	);

	const onFinish: FormProps<TField>['onFinish'] = async (values) => {
		if (
			!values.name ||
			!values.class ||
			!values.subclass ||
			!values.type ||
			!values.info
		) {
			showToast('error', 'Введите все обязательные поля');
			return;
		}

		const plantInfo = new PlantInfo({
			id: '',
			name: values.name,
			class: values.class,
			subclass: values.subclass,
			type: values.type,
			image: '',
			info: values.info,
			properties: {
				add: values.properties?.add ?? [],
				pests: values.properties?.pests ?? null,
				toxic: values.properties?.toxic ?? null,
				water: values.properties?.water ?? null,
				height: values.properties?.height ?? null,
				spread: values.properties?.spread ?? null,
				phSoil: values.properties?.phSoil ?? [],
				season: values.properties?.season ?? [],
				diseases: values.properties?.diseases ?? null,
				drainage: values.properties?.drainage ?? [],
				position: values.properties?.position ?? [],
				inGarden: values.properties?.inGarden ?? [],
				soilType: values.properties?.soilType ?? [],
				tolerance: values.properties?.tolerance ?? [],
				maintenance: values.properties?.maintenance ?? null,
				propagation: values.properties?.propagation ?? null,
			},
		});

		const plantsService = new PlantsService();

		try {
			setIsFetching(true);

			const response = await plantsService.addPlant(plantInfo.toApi());

			showToast('success', 'Растение создано');

			navigate(`/plants/${response.id}`);
		} catch (error: unknown) {
			showToast(
				'error',
				error instanceof Error
					? error.message
					: 'Ошибка при выполнении действия',
			);
		} finally {
			setIsFetching(false);
		}
	};

	return {
		isFetching,
		classOptionValues,
		subClassOptionValues,
		typeOptionValues,
		onFinish,
	};
};
