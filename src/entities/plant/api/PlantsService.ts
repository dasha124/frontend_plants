/* eslint-disable no-undef */

import { PlantInfo, TPlantInfoApi } from '@/entities/plant/model';
import { TypePlantsInfo } from '@/entities/typePlants/model';
import { TPlantSearchParams } from '@/features/plants/model';
import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model/enums';

import plantMocked from './mocks/plant.json';
import plantsMocked from './mocks/plants.json';
import typePlants from './mocks/typePlants.json';

export class PlantsService extends ServiceBase {
	private static instance: PlantsService;
	private baseUrl = '/api/plants/';

	constructor() {
		super();
		if (PlantsService.instance) {
			return PlantsService.instance;
		}

		PlantsService.instance = this;
		this.config = [
			{
				name: 'getPlants',
				url: `${this.baseUrl}`,
				method: ERequestMethods.GET,
			},
			{
				name: 'getPlantInfo',
				url: `${this.baseUrl}`,
				method: ERequestMethods.GET,
			},
			{
				name: 'addPlant',
				url: `${this.baseUrl}`,
				method: ERequestMethods.POST,
			},
			{
				name: 'updatePlant',
				url: `${this.baseUrl}`,
				method: ERequestMethods.PUT,
			},
			{
				name: 'getPlantTypes',
				url: `${this.baseUrl}types/`,
				method: ERequestMethods.GET,
			},
			{
				name: 'deletePlant',
				url: `${this.baseUrl}`,
				method: ERequestMethods.DELETE,
			},
		];
	}

	/**
	 * Получение списка всех растений
	 * @param params - Параметры поиска растений
	 */
	async getPlants(params?: TPlantSearchParams): Promise<PlantInfo[]> {
		const configItem = this.getConfigItem('getPlants');

		let response;

		try {
			const searchParams = new URLSearchParams();
			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						searchParams.append(key, value);
					}
				});
			}

			const queryString = searchParams.toString();
			response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${queryString ? `?${queryString}` : ''}`,
			);
		} catch (error) {
			console.error(error);

			response = plantsMocked;
		}

		return response.map(PlantInfo.createFromApi);
	}

	/**
	 * Получение информации о растении
	 * @param id - Идентификатор растения
	 */
	async getPlantInfo(id: string): Promise<PlantInfo> {
		const configItem = this.getConfigItem('getPlantInfo');

		let response;

		try {
			response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${id}/`,
			);
		} catch (error) {
			console.error(error);

			response = plantMocked;
		}

		return PlantInfo.createFromApi(response);
	}

	/**
	 * Создание нового растения
	 * @param plantInfo - Данные о новом растения
	 */
	async addPlant(plantInfo: TPlantInfoApi): Promise<PlantInfo> {
		const configItem = this.getConfigItem('addPlant');

		let response;

		// try {
		response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}add_plant/`,
			{ ...plantInfo },
		);
		// } catch (error) {
		// 	console.error(error);

		// 	response = plantMocked;
		// }

		return PlantInfo.createFromApi(response);
	}

	/**
	 * Обновление данных о растении
	 * @param plantInfo - Данные о растении
	 */
	async updatePlant(plantInfo: TPlantInfoApi): Promise<PlantInfo> {
		const configItem = this.getConfigItem('updatePlant');

		let response;

		try {
			response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${plantInfo.plant_id}/update_plant/`,
				{ ...plantInfo },
			);
		} catch (error) {
			console.error(error);

			response = plantMocked;
		}

		return PlantInfo.createFromApi(response);
	}

	/**
	 * Получение информации о cписке типов растений
	 */
	async getPlantTypes(): Promise<TypePlantsInfo[]> {
		const configItem = this.getConfigItem('getPlantTypes');

		let response;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url);
		} catch (error) {
			console.error(error);

			response = typePlants;
		}

		return response.map(TypePlantsInfo.createFromApi);
	}

	/**
	 * Удаление растения
	 * @param id - Идентификатор растения
	 */
	async deletePlant(id: string): Promise<void> {
		const configItem = this.getConfigItem('deletePlant');

		try {
			await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${id}/delete_plant/`,
			);
		} catch (error) {
			console.error(error);
		}
	}
}
