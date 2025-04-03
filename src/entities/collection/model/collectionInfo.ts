import {
	PlantInfo,
	TPlantInfoApi,
	TPlantShortInfo,
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
	plants: TPlantShortInfo[];
};

export class CollectionInfo {
	id: string;
	name: string;
	userId: string;
	dateCreate: string;
	timeCreate: string;
	status: string;
	plants: TPlantShortInfo[];

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
		this.plants = plants;
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
				PlantInfo.createShortInfoFromApi(plant),
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
}
