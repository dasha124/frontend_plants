/* eslint-disable no-undef */

import { PlantInfo } from '@/entities/plant/model';
import { TypePlantsInfo } from '@/entities/typePlants/model';
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
				name: 'getPlantTypes',
				url: `${this.baseUrl}types/`,
				method: ERequestMethods.GET,
			},
		];
	}

	/**
	 * Получение списка всех растений
	 */
	async getPlants(): Promise<PlantInfo[]> {
		const configItem = this.getConfigItem('getPlants');

		let response;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url);
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
}
