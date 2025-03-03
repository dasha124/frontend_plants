export type TPlantInfoApi = {
	plant_id: string;
	plant_name: string;
};

export type TPlantShortInfo = {
	id: string;
	name: string;
};

export type TPlantInfoModel = {
	id: string;
	name: string;
};

export class PlantInfo {
	id: string;
	name: string;

	constructor({ id, name }: TPlantInfoModel) {
		this.id = id;
		this.name = name;
	}

	static createFromApi(plantInfo: TPlantInfoApi): PlantInfo {
		return new PlantInfo({
			id: plantInfo.plant_id,
			name: plantInfo.plant_name,
		});
	}

	toApi(): TPlantInfoApi {
		return {
			plant_id: this.id,
			plant_name: this.name,
		};
	}
}
