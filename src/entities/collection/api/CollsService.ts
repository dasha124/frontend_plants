/* eslint-disable no-undef */

import { CollectionInfo } from '@/entities/collection/model';
import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model/enums';

import collectionMocked from './mocks/collection.json';
import collectionsMocked from './mocks/collections.json';

export class CollsService extends ServiceBase {
	private static instance: CollsService;
	private baseUrl = '/api/collections/';

	constructor() {
		super();
		if (CollsService.instance) {
			return CollsService.instance;
		}

		CollsService.instance = this;
		this.config = [
			{
				name: 'getCollections',
				url: `${this.baseUrl}`,
				method: ERequestMethods.GET,
			},
			{
				name: 'getCollection',
				url: `${this.baseUrl}`,
				method: ERequestMethods.GET,
			},
		];
	}

	/**
	 * Получение списка всех коллекций
	 */
	async getCollections(): Promise<CollectionInfo[]> {
		const configItem = this.getConfigItem('getCollections');

		let response;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url);
		} catch (error) {
			console.error(error);

			response = collectionsMocked;
		}

		return response.map(CollectionInfo.createFromApi);
	}

	/**
	 * Получение информации о коллекции
	 * @param id - Идентификатор коллекции
	 */
	async getCollectionInfo(id: string): Promise<CollectionInfo> {
		const configItem = this.getConfigItem('getCollectionInfo');

		let response;

		try {
			response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${id}/`,
			);
		} catch (error) {
			console.error(error);

			response = collectionMocked;
		}

		return CollectionInfo.createFromApi(response);
	}
}
