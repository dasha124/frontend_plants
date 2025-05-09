import type { FormProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlantsService } from '@/entities/plant/api';
import {
	EPlantClass,
	EPlantSubclass,
	EPlantType,
	PlantInfo,
	TPlantInfoModel,
} from '@/entities/plant/model';
import { showToast } from '@/shared/utils';

export type TField = TPlantInfoModel;

export const usePlantEdit = (id: string) => {
	const navigate = useNavigate();

	const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
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

	const onFinishFailed: FormProps<TField>['onFinishFailed'] = () => {
		showToast('error', 'Введите все обязательные поля');
	};

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

		const plant = new PlantInfo({
			id: plantInfo!.id,
			name: values.name,
			class: values.class,
			subclass: values.subclass,
			type: values.type,
			image: values.image,
			info: values.info,
			properties: {
				add: values.properties.add?.length === 0 ? [] : values.properties.add,
				pests:
					values.properties.pests?.length === 0
						? null
						: values.properties.pests,
				toxic:
					values.properties.toxic?.length === 0
						? null
						: values.properties.toxic,
				water:
					values.properties.water?.length === 0
						? null
						: values.properties.water,
				height:
					values.properties.height?.length === 0
						? null
						: values.properties.height,
				spread:
					values.properties.spread?.length === 0
						? null
						: values.properties.spread,
				phSoil:
					values.properties.phSoil?.length === 0
						? []
						: values.properties.phSoil,
				season:
					values.properties.season?.length === 0
						? []
						: values.properties.season,
				diseases:
					values.properties.diseases?.length === 0
						? null
						: values.properties.diseases,
				drainage:
					values.properties.drainage?.length === 0
						? []
						: values.properties.drainage,
				position:
					values.properties.position?.length === 0
						? []
						: values.properties.position,
				inGarden:
					values.properties.inGarden?.length === 0
						? []
						: values.properties.inGarden,
				soilType:
					values.properties.soilType?.length === 0
						? []
						: values.properties.soilType,
				tolerance:
					values.properties.tolerance?.length === 0
						? []
						: values.properties.tolerance,
				maintenance:
					values.properties.maintenance?.length === 0
						? null
						: values.properties.maintenance,
				propagation:
					values.properties.propagation?.length === 0
						? null
						: values.properties.propagation,
			},
		});

		const plantsService = new PlantsService();

		try {
			setIsFetching(true);

			const response = await plantsService.updatePlant(plant.toApi());

			showToast('success', 'Информация обновлена');

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

	const loadPlantInfo = useCallback(async (id: string) => {
		try {
			const plantsService = new PlantsService();

			const plant = await plantsService.getPlantInfo(id);
			setPlantInfo(plant);
		} catch (error: unknown) {
			setPlantInfo(null);

			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		} finally {
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		loadPlantInfo(id);
	}, [id, loadPlantInfo]);

	return {
		isLoaded,
		plantInfo,
		isFetching,
		classOptionValues,
		subClassOptionValues,
		typeOptionValues,
		onFinish,
		onFinishFailed,
	};
};
