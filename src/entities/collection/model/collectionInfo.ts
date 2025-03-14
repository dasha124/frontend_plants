import {
	PlantInfo,
	TPlantInfoApi,
	TPlantInfoModel,
} from '@/entities/plant/model';

export type TCollectionInfoApi = {
	collection_id: string;
	collection_name: string;
	user_id: string;
	date_create: string;
	time_create: string;
	status: string;
	plant: TPlantInfoApi[];
};

export type TCollectionShortInfo = {
	id: string;
	name: string;
	dateCreate: string;
	timeCreate: string;
	status: string;
	plantsCount: number;
};

export type TCollectionInfoModel = {
	id: string;
	name: string;
	userId: string;
	dateCreate: string;
	timeCreate: string;
	status: string;
	plants: TPlantInfoModel[];
};

export class CollectionInfo {
	id: string;
	name: string;
	userId: string;
	dateCreate: string;
	timeCreate: string;
	status: string;
	plants: PlantInfo[];

	constructor({
		id,
		name,
		userId,
		dateCreate,
		timeCreate,
		status,
		plants,
	}: TCollectionInfoModel) {
		this.id = id;
		this.name = name;
		this.userId = userId;
		this.dateCreate = dateCreate;
		this.timeCreate = timeCreate;
		this.status = status;
		this.plants = plants.map((plant) => new PlantInfo(plant));
	}

	static createFromApi(collectionInfo: TCollectionInfoApi): CollectionInfo {
		return new CollectionInfo({
			id: collectionInfo.collection_id,
			name: collectionInfo.collection_name,
			userId: collectionInfo.user_id,
			dateCreate: collectionInfo.date_create,
			timeCreate: collectionInfo.time_create,
			status: collectionInfo.status,
			plants: collectionInfo.plant.map((plant) =>
				PlantInfo.createFromApi(plant),
			),
		});
	}

	toShortInfo(): TCollectionShortInfo {
		return {
			id: this.id,
			name: this.name,
			dateCreate: this.dateCreate,
			timeCreate: this.timeCreate,
			status: this.status,
			plantsCount: this.plants.length,
		};
	}

	toApi(): TCollectionInfoApi {
		return {
			collection_id: this.id,
			collection_name: this.name,
			user_id: this.userId,
			date_create: this.dateCreate,
			time_create: this.timeCreate,
			status: this.status,
			plant: this.plants.map((plant) => plant.toApi()),
		};
	}
}
