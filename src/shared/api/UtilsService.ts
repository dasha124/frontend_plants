/* eslint-disable no-undef */

import { PlantInfo, TPlantInfoApi } from '@/entities/plant/model';
import { ERequestMethods } from '@/shared/model/enums';

import { ServiceBase } from './ServiceBase';

export class UtilsService extends ServiceBase {
	private static instance: UtilsService;
	private baseUrl = '/api/';

	private readonly mockImageResponse = {
		image_url_plant: 'http://localhost:3000/images/unknown.png',
	};

	constructor() {
		super();
		if (UtilsService.instance) {
			return UtilsService.instance;
		}

		UtilsService.instance = this;
		this.config = [
			{
				name: 'uploadImage',
				url: `${this.baseUrl}to_minio/`,
				method: ERequestMethods.POST,
			},
			{
				name: 'detectPlant',
				url: `${this.baseUrl}plant/search`,
				method: ERequestMethods.POST,
			},
		];
	}

	/**
	 * Загрузка изображения
	 * @param imageBase64
	 */
	async uploadImage(name: string, imageBase64: string): Promise<string> {
		const configItem = this.getConfigItem('uploadImage');

		let response;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url, {
				plant_name: name,
				base64str: imageBase64,
			});
		} catch (error) {
			console.error(error);

			if (this.isDebugMode) {
				response = this.mockImageResponse;
			} else {
				throw error;
			}
		}

		return response.image_url_plant;
	}

	/**
	 * Распознавание типа растения
	 * @param imageBase64
	 */
	async detectPlantType(imageBase64: string): Promise<{
		type: string;
		plants: PlantInfo[];
	}> {
		const configItem = this.getConfigItem('detectPlant');

		let response;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url, {
				plant_name: name,
				base64str: imageBase64,
			});
		} catch (error) {
			console.error(error);

			if (this.isDebugMode) {
				const { default: detectPlant } = await import(
					'./mocks/detectPlant.json'
				);
				response = detectPlant;
			} else {
				throw error;
			}
		}

		return {
			type: response.type,
			plants: response.plants.map((plant: TPlantInfoApi) =>
				PlantInfo.createShortInfoFromApi(plant),
			),
		};
	}
}
