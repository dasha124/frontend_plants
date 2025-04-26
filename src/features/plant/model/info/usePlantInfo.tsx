import { CollapseProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PlantsService } from '@/entities/plant/api';
import { PlantInfo, TPlantRecommendation } from '@/entities/plant/model';
import { selectIsAuthorized, selectIsSuperuser } from '@/entities/user/model';
import { RecommendationService } from '@/shared/api';
import { emitEvent, EmitterEvents, showError, showToast } from '@/shared/utils';

export const usePlantInfo = (id: string) => {
	const navigate = useNavigate();

	const isSuperuser = useSelector(selectIsSuperuser);
	const isAuthorized = useSelector(selectIsAuthorized);

	const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [plantRecommendations, setPlantRecommendations] = useState<
		TPlantRecommendation[]
	>([]);
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
						plantInfo.properties.add.length > 0
							? {
									key: '1',
									label: 'Дополнительная информация',
									children: plantInfo.properties.add.map((item, index) => (
										<p key={index}>{item}</p>
									)),
								}
							: {},
						plantInfo.properties.pests
							? {
									key: '2',
									label: 'Восприимчивость к вредителям',
									children: <p>{plantInfo.properties.pests}</p>,
								}
							: {},
						plantInfo.properties.toxic
							? {
									key: '3',
									label: 'Токсичность',
									children: <p>{plantInfo.properties.toxic}</p>,
								}
							: {},
						plantInfo.properties.water
							? {
									key: '4',
									label: 'Потребность в поливе',
									children: <p>{plantInfo.properties.water}</p>,
								}
							: {},
						plantInfo.properties.height
							? {
									key: '5',
									label: 'Высота',
									children: <p>{plantInfo.properties.height}</p>,
								}
							: {},
						plantInfo.properties.spread
							? {
									key: '6',
									label: 'Ширина',
									children: <p>{plantInfo.properties.spread}</p>,
								}
							: {},
						plantInfo.properties.phSoil.length > 0
							? {
									key: '7',
									label: 'pH Почвы',
									children: (
										<p>
											{plantInfo.properties.phSoil.map((item, index) => (
												<p key={index}>{item}</p>
											))}
										</p>
									),
								}
							: {},
						plantInfo.properties.season.length > 0
							? {
									key: '8',
									label: 'Сезон',
									children: (
										<p>
											{plantInfo.properties.season.map((item, index) => (
												<p key={index}>{item}</p>
											))}
										</p>
									),
								}
							: {},
						plantInfo.properties.diseases
							? {
									key: '9',
									label: 'Восприимчивость к болезням',
									children: <p>{plantInfo.properties.diseases}</p>,
								}
							: {},
						plantInfo.properties.drainage.length > 0
							? {
									key: '10',
									label: 'Дренаж почвы',
									children: (
										<p>
											{plantInfo.properties.drainage.map((item, index) => (
												<p key={index}>{item}</p>
											))}
										</p>
									),
								}
							: {},
						plantInfo.properties.position.length > 0
							? {
									key: '11',
									label: 'Позиция относительно солнца',
									children: (
										<p>
											{plantInfo.properties.position.map((item, index) => (
												<p key={index}>{item}</p>
											))}
										</p>
									),
								}
							: {},
						plantInfo.properties.inGarden.length > 0
							? {
									key: '12',
									label: 'Что может украсить в саду',
									children: (
										<p>
											{plantInfo.properties.inGarden.map((item, index) => (
												<p key={index}>{item}</p>
											))}
										</p>
									),
								}
							: {},
						plantInfo.properties.soilType.length > 0
							? {
									key: '13',
									label: 'Тип почвы',
									children: (
										<p>
											{plantInfo.properties.soilType.map((item, index) => (
												<p key={index}>{item}</p>
											))}
										</p>
									),
								}
							: {},
						plantInfo.properties.tolerance.length > 0
							? {
									key: '14',
									label: 'К каким условиям среды толерантен',
									children: (
										<p>
											{plantInfo.properties.tolerance.map((item, index) => (
												<p key={index}>{item}</p>
											))}
										</p>
									),
								}
							: {},
						plantInfo.properties.maintenance
							? {
									key: '15',
									label: 'Требуемый уровень ухода',
									children: <p>{plantInfo.properties.maintenance}</p>,
								}
							: {},
						plantInfo.properties.propagation
							? {
									key: '16',
									label: 'Размножение',
									children: <p>{plantInfo.properties.propagation}</p>,
								}
							: {},
					]
				: [],
		[plantInfo],
	);

	const chunkSize = Math.ceil(properties.length / 3);
	const [part1, part2, part3] = [
		properties.slice(0, chunkSize),
		properties.slice(chunkSize, chunkSize * 2),
		properties.slice(chunkSize * 2),
	];

	const loadPlantInfo = useCallback(async (id: string) => {
		try {
			const plantsService = new PlantsService();

			const plant = await plantsService.getPlantInfo(id);
			setPlantInfo(plant);
		} catch (error: unknown) {
			setPlantInfo(null);

			showError(error);
		} finally {
			setIsLoaded(true);
		}
	}, []);

	const loadRecommendations = async () => {
		if (plantRecommendations.length > 0) return;

		try {
			setIsFetching(true);

			const recommendationsService = new RecommendationService();

			const recommendations =
				await recommendationsService.getRecommendationsByPlant(id);

			setPlantRecommendations(recommendations);
		} catch (error: unknown) {
			setPlantRecommendations([]);

			showError(error);
		} finally {
			setIsFetching(false);
		}
	};

	const handleDelete = async () => {
		emitEvent(EmitterEvents.MODAL_OPEN_DELETE_PLANT, {
			plantId: id,
		});
	};

	const handleAddToCollection = async () => {
		if (!isAuthorized) {
			showToast('info', 'Авторизуйтесь, чтобы добавить растение в коллекцию');
			navigate('/login');

			return;
		}

		emitEvent(EmitterEvents.MODAL_OPEN_PLANT_ADD_TO_COLLECTION, {
			plantId: id,
		});
	};

	useEffect(() => {
		loadPlantInfo(id);
	}, [id, loadPlantInfo]);

	return {
		isLoaded,
		isFetching,
		plantInfo,
		mainFields,
		part1,
		part2,
		part3,
		isSuperuser,
		plantRecommendations,
		handleDelete,
		handleAddToCollection,
		loadRecommendations,
	};
};
