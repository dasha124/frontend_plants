/* eslint-disable no-undef */

import { CollectionInfo } from '@/entities/collection/model';
import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model/enums';

import collectionMocked from './mocks/collection.json';
import collectionsMocked from './mocks/collections.json';

export class CollectionsService extends ServiceBase {
	private static instance: CollectionsService;
	private baseUrl = '/api/collections/';

	constructor() {
		super();
		if (CollectionsService.instance) {
			return CollectionsService.instance;
		}

		CollectionsService.instance = this;
		this.config = [
			{
				name: 'getCollections',
				url: this.baseUrl,
				method: ERequestMethods.GET,
			},
			{
				name: 'getCollectionInfo',
				url: this.baseUrl,
				method: ERequestMethods.GET,
			},
			{
				name: 'createCollection',
				url: `${this.baseUrl}create/`,
				method: ERequestMethods.POST,
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

	/**
	 * Создание коллекции
	 * @param name - Название коллекции
	 */
	async createCollection(name: string): Promise<CollectionInfo> {
		const configItem = this.getConfigItem('createCollection');

		let response;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url, {
				collection_name: name,
			});
		} catch (error) {
			console.error(error);

			response = collectionMocked;
		}

		return CollectionInfo.createFromApi(response);
	}
}
