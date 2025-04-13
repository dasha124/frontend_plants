import { CollapseProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PlantsService } from '@/entities/plant/api';
import { PlantInfo } from '@/entities/plant/model';
import { emitEvent, EmitterEvents, showToast } from '@/shared/utils';

export const usePlant = (id: string) => {
	const [searchParams] = useSearchParams();
	const isEditMode = searchParams.get('edit') === 'true';

	const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const mainFields = useMemo(
		() => [
			{
				key: '1',
				label: 'Класс',
				value: plantInfo?.class,
			},
			{
				key: '2',
				label: 'Подкласс',
				value: plantInfo?.subclass,
			},
			{
				key: '3',
				label: 'Тип',
				value: plantInfo?.type,
			},
			{
				key: '4',
				label: 'Общая информация',
				value: plantInfo?.info,
			},
		],
		[plantInfo],
	);

	const properties: CollapseProps['items'] = useMemo(
		() =>
			plantInfo
				? [
						{
							key: '1',
							label: 'Дополнительная информация',
							children: plantInfo.properties.add.map((item, index) => (
								<p key={index}>{item}</p>
							)),
						},
						{
							key: '2',
							label: 'Восприимчивость к вредителям',
							children: <p>{plantInfo.properties.pests}</p>,
						},
						{
							key: '3',
							label: 'Токсичность',
							children: <p>{plantInfo.properties.toxic}</p>,
						},
						{
							key: '4',
							label: 'Потребность в поливе',
							children: <p>{plantInfo.properties.water}</p>,
						},
						{
							key: '5',
							label: 'Высота',
							children: <p>{plantInfo.properties.height}</p>,
						},
						{
							key: '6',
							label: 'Ширина',
							children: <p>{plantInfo.properties.spread}</p>,
						},
						{
							key: '7',
							label: 'pH Почвы',
							children: (
								<p>
									{plantInfo.properties.phSoil.map((item, index) => (
										<p key={index}>{item}</p>
									))}
								</p>
							),
						},
						{
							key: '8',
							label: 'Сезон',
							children: (
								<p>
									{plantInfo.properties.season.map((item, index) => (
										<p key={index}>{item}</p>
									))}
								</p>
							),
						},
						{
							key: '9',
							label: 'Восприимчивость к болезням',
							children: <p>{plantInfo.properties.diseases}</p>,
						},
						{
							key: '10',
							label: 'Дренаж почвы',
							children: (
								<p>
									{plantInfo.properties.drainage.map((item, index) => (
										<p key={index}>{item}</p>
									))}
								</p>
							),
						},
						{
							key: '11',
							label: 'Позиция относительно солнца',
							children: (
								<p>
									{plantInfo.properties.position.map((item, index) => (
										<p key={index}>{item}</p>
									))}
								</p>
							),
						},
						{
							key: '12',
							label: 'Что может украсить в саду',
							children: (
								<p>
									{plantInfo.properties.inGarden.map((item, index) => (
										<p key={index}>{item}</p>
									))}
								</p>
							),
						},
						{
							key: '13',
							label: 'Тип почвы',
							children: (
								<p>
									{plantInfo.properties.soilType.map((item, index) => (
										<p key={index}>{item}</p>
									))}
								</p>
							),
						},
						{
							key: '14',
							label: 'К каким условиям среды толерантен',
							children: (
								<p>
									{plantInfo.properties.tolerance.map((item, index) => (
										<p key={index}>{item}</p>
									))}
								</p>
							),
						},
						{
							key: '15',
							label: 'Требуемый уровень ухода',
							children: <p>{plantInfo.properties.maintenance}</p>,
						},
						{
							key: '16',
							label: 'Размножение',
							children: <p>{plantInfo.properties.propagation}</p>,
						},
					]
				: [],
		[plantInfo],
	);

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

	const handleDelete = async () => {
		emitEvent(EmitterEvents.MODAL_OPEN_DELETE_PLANT, {
			plantId: id,
		});
	};

	useEffect(() => {
		loadPlantInfo(id);
	}, [id, loadPlantInfo]);

	return {
		isLoaded,
		plantInfo,
		mainFields,
		properties,
		isEditMode,
		handleDelete,
	};
};
