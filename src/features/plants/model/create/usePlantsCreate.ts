import { Form, FormProps } from 'antd';
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
import { convertPropertiesToArray, sanitizePropertyValue } from '@/shared/lib';
import { showError, showToast } from '@/shared/utils';

export type TField = Partial<
	Omit<TPlantCreate, 'properties'> & {
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
	}
>;

export const usePlantsCreate = () => {
	const navigate = useNavigate();

	const [form] = Form.useForm();

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
			!values.image ||
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

		const plantsService = new PlantsService();

		try {
			setIsFetching(true);

			const response = await plantsService.addPlant(plantInfo.toApi());

			showToast('success', 'Растение создано');

			navigate(`/plants/${response.id}`);
		} catch (error: unknown) {
			showError(error);
		} finally {
			setIsFetching(false);
		}
	};

	const setLink = (url: string) => {
		setImageUrl(url);
		form.setFieldsValue({ image: url });
	};

	const removeLink = () => {
		setImageUrl(null);
		form.setFieldsValue({ image: null });
	};

	return {
		isFetching,
		classOptionValues,
		subClassOptionValues,
		typeOptionValues,
		imageUrl,
		form,
		imageName,
		setImageName,
		setLink,
		removeLink,
		onFinish,
		onFinishFailed,
	};
};
