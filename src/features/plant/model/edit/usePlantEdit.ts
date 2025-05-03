/* eslint-disable no-undef */

import { Form, FormProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlantsService } from '@/entities/plant/api';
import {
	EPlantClass,
	EPlantSubclass,
	EPlantType,
	PlantInfo,
	TPlantCreate,
	TPlantInfoModel,
} from '@/entities/plant/model';
import { showError, showToast } from '@/shared/utils';

export type TField = Omit<TPlantInfoModel, 'properties'> & {
	properties: Omit<
		TPlantCreate['properties'],
		| 'add'
		| 'phSoil'
		| 'season'
		| 'drainage'
		| 'position'
		| 'inGarden'
		| 'soilType'
		| 'tolerance'
	> & {
		add: string;
		phSoil: string;
		season: string;
		drainage: string;
		position: string;
		inGarden: string;
		soilType: string;
		tolerance: string;
	};
};

export const usePlantEdit = (id: string) => {
	const navigate = useNavigate();

	const [form] = Form.useForm();

	const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string>('');

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
				add: values.properties?.add ? values.properties.add.split(',') : [],
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
				phSoil: values.properties?.phSoil
					? values.properties.phSoil.split(',')
					: [],
				season: values.properties?.season
					? values.properties.season.split(',')
					: [],
				diseases:
					values.properties.diseases?.length === 0
						? null
						: values.properties.diseases,
				drainage: values.properties?.drainage
					? values.properties.drainage.split(',')
					: [],
				position: values.properties?.position
					? values.properties.position.split(',')
					: [],
				inGarden: values.properties?.inGarden
					? values.properties.inGarden.split(',')
					: [],
				soilType: values.properties?.soilType
					? values.properties.soilType.split(',')
					: [],
				tolerance: values.properties?.tolerance
					? values.properties.tolerance.split(',')
					: [],
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
			showError(error);
		} finally {
			setIsFetching(false);
		}
	};

	const loadPlantInfo = useCallback(async (id: string) => {
		try {
			const plantsService = new PlantsService();

			const plant = await plantsService.getPlantInfo(id);
			setPlantInfo(plant);
			setImageUrl(plant.image);
			setImageName(plant.name);
		} catch (error: unknown) {
			setPlantInfo(null);
			setImageUrl(null);
			setImageName('');

			showError(error);
		} finally {
			setTimeout(() => {
				setIsLoaded(true);
			}, 1000);
		}
	}, []);

	const setLink = (url: string) => {
		setImageUrl(url);
		form.setFieldsValue({ image: url });
	};

	const removeLink = () => {
		setImageUrl(null);
		form.setFieldsValue({ image: null });
	};

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
		imageUrl,
		imageName,
		form,
		setImageName,
		setLink,
		removeLink,
		onFinish,
		onFinishFailed,
	};
};
