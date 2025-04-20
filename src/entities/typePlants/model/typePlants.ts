export type TTypePlantsInfoApi = {
	plant_type_id: string;
	type_name: string;
	image_url_type: string;
};

export type TTypePlantsInfoModel = {
	id: string;
	name: string;
	image: string;
};

export class TypePlantsInfo {
	id: string;
	name: string;
	image: string;

	constructor({ id, name, image }: TTypePlantsInfoModel) {
		this.id = id;
		this.name = name;
		this.image = image;
	}

	static createFromApi(plantInfo: TTypePlantsInfoApi): TypePlantsInfo {
		return new TypePlantsInfo({
			id: plantInfo.plant_type_id,
			name: plantInfo.type_name,
			image: plantInfo.image_url_type,
		});
	}

	toApi(): TTypePlantsInfoApi {
		return {
			plant_type_id: this.id,
			type_name: this.name,
			image_url_type: this.image,
		};
	}
}
