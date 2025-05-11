/* eslint-disable no-undef */

import { ERequestMethods } from '@/shared/model/enums';

import { ServiceBase } from './ServiceBase';

export class UtilsService extends ServiceBase {
	private static instance: UtilsService;
	private baseUrl = '/api/';

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
				response = {
					image_url_plant: 'http://localhost:3000/images/unknown.png',
				};
			} else {
				throw error;
			}
		}

		return response.image_url_plant;
	}
}
