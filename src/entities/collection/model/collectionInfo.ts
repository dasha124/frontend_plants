export type TCollectionInfoApi = {
	collection_id: string;
	collection_name: string;
};

export type TCollectionShortInfo = {
	id: string;
	name: string;
};

export type TCollectionInfoModel = {
	id: string;
	name: string;
};

export class CollectionInfo {
	id: string;
	name: string;

	constructor({ id, name }: TCollectionInfoModel) {
		this.id = id;
		this.name = name;
	}

	static createFromApi(collectionInfo: TCollectionInfoApi): CollectionInfo {
		return new CollectionInfo({
			id: collectionInfo.collection_id,
			name: collectionInfo.collection_name,
		});
	}

	toApi(): TCollectionInfoApi {
		return {
			collection_id: this.id,
			collection_name: this.name,
		};
	}
}
