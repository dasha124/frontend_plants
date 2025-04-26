/* eslint-disable no-undef */

import { PlantInfo, TPlantRecommendation } from '@/entities/plant/model';
import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model/enums';

import recommendationsMocked from './mocks/recommendations.json';

export class RecommendationService extends ServiceBase {
	private static instance: RecommendationService;
	private baseUrl = '/api/recommendations/';

	constructor() {
		super();
		if (RecommendationService.instance) {
			return RecommendationService.instance;
		}

		RecommendationService.instance = this;
		this.config = [
			{
				name: 'getRecommendationsByCollection',
				url: `${this.baseUrl}coll/`,
				method: ERequestMethods.GET,
			},
			{
				name: 'getRecommendationsByPlant',
				url: `${this.baseUrl}plant/`,
				method: ERequestMethods.GET,
			},
		];
	}

	/**
	 * Получение рекомендаций по коллекции
	 */
	async getRecommendationsByCollection(
		collectionId: string,
	): Promise<TPlantRecommendation[]> {
		const configItem = this.getConfigItem('getRecommendationsByCollection');

		let response;

		try {
			response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${collectionId}/`,
			);
		} catch (error) {
			console.error(error);

			response = recommendationsMocked;
		}

		return response.map(PlantInfo.createRecommendationFromApi);
	}

	/**
	 * Получение рекомендаций по растению
	 */
	async getRecommendationsByPlant(
		plantId: string,
	): Promise<TPlantRecommendation[]> {
		const configItem = this.getConfigItem('getRecommendationsByPlant');

		let response;

		try {
			response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${plantId}/`,
			);
		} catch (error) {
			console.error(error);

			response = recommendationsMocked;
		}

		return response.map(PlantInfo.createRecommendationFromApi);
	}
}
