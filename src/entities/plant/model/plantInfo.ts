export type TPlantInfoApi = {
	plant_id: string;
	plant_name: string;
	plant_class: string;
	plant_subclass: string;
	plant_type: string;
	image_url_plant: string;
	general_info: string;
	properties: {
		add: string[];
		pests: string;
		toxic: string;
		water: string;
		height: string;
		season: string[];
		spread: string;
		diseases: string;
		drainage: string[];
		position: string[];
		tolerance: string[];
		maintenance: string;
		propagation: string;
	};
};

export type TPlantShortInfo = {
	id: string;
	name: string;
	image: string;
};

export type TPlantInfoModel = {
	id: string;
	name: string;
	class: string;
	subclass: string;
	type: string;
	image: string;
	info: string;
	properties: {
		add: string[];
		pests: string;
		toxic: string;
		water: string;
		height: string;
		season: string[];
		spread: string;
		diseases: string;
		drainage: string[];
		position: string[];
		tolerance: string[];
		maintenance: string;
		propagation: string;
	};
};

export class PlantInfo {
	id: string;
	name: string;
	class: string;
	subclass: string;
	type: string;
	image: string;
	info: string;
	properties: {
		add: string[];
		pests: string;
		toxic: string;
		water: string;
		height: string;
		season: string[];
		spread: string;
		diseases: string;
		drainage: string[];
		position: string[];
		tolerance: string[];
		maintenance: string;
		propagation: string;
	};

	constructor({
		id,
		name,
		class: className,
		subclass,
		type,
		image,
		info,
		properties,
	}: TPlantInfoModel) {
		this.id = id;
		this.name = name;
		this.class = className;
		this.subclass = subclass;
		this.type = type;
		this.image = image;
		this.info = info;
		this.properties = properties;
	}

	static createFromApi(plantInfo: TPlantInfoApi): PlantInfo {
		return new PlantInfo({
			id: plantInfo.plant_id,
			name: plantInfo.plant_name,
			class: plantInfo.plant_class,
			subclass: plantInfo.plant_subclass,
			type: plantInfo.plant_type,
			image: plantInfo.image_url_plant,
			info: plantInfo.general_info,
			properties: plantInfo.properties,
		});
	}

	toApi(): TPlantInfoApi {
		return {
			plant_id: this.id,
			plant_name: this.name,
			plant_class: this.class,
			plant_subclass: this.subclass,
			plant_type: this.type,
			image_url_plant: this.image,
			general_info: this.info,
			properties: this.properties,
		};
	}

	toShortInfo(): TPlantShortInfo {
		return {
			id: this.id,
			name: this.name,
			image: this.image,
		};
	}
}
