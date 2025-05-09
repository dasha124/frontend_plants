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
		pests: string | null;
		toxic: string | null;
		water: string | null;
		height: string | null;
		season: string[];
		spread: string | null;
		ph_soil: string[];
		diseases: string | null;
		drainage: string[];
		position: string[];
		in_garden: string[];
		soil_type: string[];
		tolerance: string[];
		maintenance: string | null;
		propagation: string | null;
	};
};

export type TPlantInfoModel = {
	id: string;
	name: string;
	class: string;
	subclass: string;
	type: string;
	image: string; // -
	info: string;
	properties: {
		add: string[];
		pests: string | null;
		toxic: string | null;
		water: string | null;
		height: string | null;
		spread: string | null;
		phSoil: string[];
		season: string[];
		diseases: string | null;
		drainage: string[];
		position: string[];
		inGarden: string[];
		soilType: string[];
		tolerance: string[];
		maintenance: string | null;
		propagation: string | null;
	};
};

export type TPlantShortInfo = Pick<TPlantInfoModel, 'id' | 'name' | 'image'>;

export type TPlantCreate = Omit<TPlantInfoModel, 'id'>;

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
		pests: string | null;
		toxic: string | null;
		water: string | null;
		height: string | null;
		spread: string | null;
		phSoil: string[];
		season: string[];
		diseases: string | null;
		drainage: string[];
		position: string[];
		inGarden: string[];
		soilType: string[];
		tolerance: string[];
		maintenance: string | null;
		propagation: string | null;
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
			properties: {
				...plantInfo.properties,
				phSoil: plantInfo.properties.ph_soil,
				inGarden: plantInfo.properties.in_garden,
				soilType: plantInfo.properties.soil_type,
			},
		});
	}

	static createShortInfoFromApi(plantInfo: TPlantInfoApi): TPlantShortInfo {
		return {
			id: plantInfo.plant_id,
			name: plantInfo.plant_name,
			image: plantInfo.image_url_plant,
		};
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
			properties: {
				...this.properties,
				ph_soil: this.properties.phSoil,
				in_garden: this.properties.inGarden,
				soil_type: this.properties.soilType,
			},
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
