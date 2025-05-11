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
import { convertPropertiesToArray, sanitizePropertyValue } from '@/shared/lib';
import { showError, showToast } from '@/shared/utils';

type TPlantProperties = Omit<
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

export type TField = Omit<TPlantInfoModel, 'properties'> & {
	properties: TPlantProperties;
};

type TSelectOption = {
	value: string;
	label: string;
};

export const usePlantEdit = (id: string) => {
	const navigate = useNavigate();
	const [form] = Form.useForm<TField>();

	const [plantInfo, setPlantInfo] = useState<TField | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string>('');

	const classOptionValues = useMemo<TSelectOption[]>(
		() => Object.values(EPlantClass).map((key) => ({ value: key, label: key })),
		[],
	);

	const subClassOptionValues = useMemo<TSelectOption[]>(
		() =>
			Object.values(EPlantSubclass).map((key) => ({ value: key, label: key })),
		[],
	);

	const typeOptionValues = useMemo<TSelectOption[]>(
		() => Object.values(EPlantType).map((key) => ({ value: key, label: key })),
		[],
	);

	const handleFormError: FormProps<TField>['onFinishFailed'] = () => {
		showToast('error', 'Введите все обязательные поля');
	};

	const validateRequiredFields = (values: TField): boolean => {
		if (
			!values.name ||
			!values.class ||
			!values.subclass ||
			!values.type ||
			!values.info
		) {
			showToast('error', 'Введите все обязательные поля');
			return false;
		}
		return true;
	};

	const handleFormSubmit: FormProps<TField>['onFinish'] = async (values) => {
		if (!validateRequiredFields(values)) return;

		const plant = new PlantInfo({
			id: plantInfo!.id,
			name: values.name,
			class: values.class,
			subclass: values.subclass,
			type: values.type,
			image: values.image,
			info: values.info,
			properties: {
				add: convertPropertiesToArray(values.properties?.add),
				pests: sanitizePropertyValue(values.properties?.pests),
				toxic: sanitizePropertyValue(values.properties?.toxic),
				water: sanitizePropertyValue(values.properties?.water),
				height: sanitizePropertyValue(values.properties?.height),
				spread: sanitizePropertyValue(values.properties?.spread),
				phSoil: convertPropertiesToArray(values.properties?.phSoil),
				season: convertPropertiesToArray(values.properties?.season),
				diseases: sanitizePropertyValue(values.properties?.diseases),
				drainage: convertPropertiesToArray(values.properties?.drainage),
				position: convertPropertiesToArray(values.properties?.position),
				inGarden: convertPropertiesToArray(values.properties?.inGarden),
				soilType: convertPropertiesToArray(values.properties?.soilType),
				tolerance: convertPropertiesToArray(values.properties?.tolerance),
				maintenance: sanitizePropertyValue(values.properties?.maintenance),
				propagation: sanitizePropertyValue(values.properties?.propagation),
			},
		});

		try {
			setIsFetching(true);
			const plantsService = new PlantsService();
			const response = await plantsService.updatePlant(plant.toApi());

			showToast('success', 'Информация обновлена');

			navigate(`/plants/${response.id}`);
		} catch (error: unknown) {
			showError(error);
		} finally {
			setIsFetching(false);
		}
	};

	const loadPlantInfo = useCallback(async (plantId: string) => {
		try {
			const plantsService = new PlantsService();
			const plant = await plantsService.getPlantInfo(plantId);

			const plantToEdit: TField = {
				...plant,
				properties: {
					...plant.properties,
					add: plant.properties?.add?.join(','),
					phSoil: plant.properties?.phSoil?.join(','),
					season: plant.properties?.season?.join(','),
					drainage: plant.properties?.drainage?.join(','),
					position: plant.properties?.position?.join(','),
					inGarden: plant.properties?.inGarden?.join(','),
					soilType: plant.properties?.soilType?.join(','),
					tolerance: plant.properties?.tolerance?.join(','),
				},
			};

			setPlantInfo(plantToEdit);
			setImageUrl(plant.image);
			setImageName(plant.name);
		} catch (error: unknown) {
			setPlantInfo(null);
			setImageUrl(null);
			setImageName('');

			showError(error);
		} finally {
			setTimeout(() => setIsLoaded(true), 1000);
		}
	}, []);

	const handleImageLink = (url: string) => {
		setImageUrl(url);
		form.setFieldsValue({ image: url });
	};

	const handleImageRemove = () => {
		setImageUrl(null);
		form.setFieldsValue({ image: undefined });
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
		setLink: handleImageLink,
		removeLink: handleImageRemove,
		onFinish: handleFormSubmit,
		onFinishFailed: handleFormError,
	};
};
