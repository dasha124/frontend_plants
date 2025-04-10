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
			{
				name: 'updateCollectionName',
				url: this.baseUrl,
				method: ERequestMethods.PUT,
			},
			{
				name: 'deleteCollection',
				url: this.baseUrl,
				method: ERequestMethods.DELETE,
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

	/**
	 * Обновление названия коллекции
	 * @param collectionId - Идентификатор коллекции
	 * @param name - Название коллекции
	 */
	async updateCollectionName(
		collectionId: string,
		name: string,
	): Promise<CollectionInfo> {
		const configItem = this.getConfigItem('updateCollectionName');

		let response;

		try {
			response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${collectionId}/update/`,
				{
					collection_name: name,
				},
			);
		} catch (error) {
			console.error(error);

			response = collectionMocked;
		}

		return CollectionInfo.createFromApi(response);
	}

	/**
	 * Удаление коллекции
	 * @param collectionId - Идентификатор коллекции
	 */
	async deleteCollection(collectionId: string): Promise<void> {
		const configItem = this.getConfigItem('deleteCollection');

		try {
			await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${collectionId}/delete/`,
			);
		} catch (error) {
			console.error(error);
		}
	}
}
