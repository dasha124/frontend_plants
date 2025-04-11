import EventEmitter from 'eventemitter3';

export enum EmitterEvents {
	MODAL_OPEN_CREATE_COLLECTION = 'modal/open/create/collection',
	MODAL_OPEN_DELETE_COLLECTION = 'modal/open/delete/collection',
	MODAL_OPEN_PLANT_ADD_TO_COLLECTION = 'modal/open/plant_add_to_collection',
}

type TEmitterPayloads = {
	[EmitterEvents.MODAL_OPEN_CREATE_COLLECTION]: void;
	[EmitterEvents.MODAL_OPEN_DELETE_COLLECTION]: void;
	[EmitterEvents.MODAL_OPEN_PLANT_ADD_TO_COLLECTION]: { plantId: string };
};

export const eventEmitter = new EventEmitter();

export function emitEvent<T extends EmitterEvents>(
	event: T,
	payload?: TEmitterPayloads[T],
) {
	eventEmitter.emit(event, payload);
}

export function onEvent<T extends EmitterEvents>(
	event: T,
	callback: (payload: TEmitterPayloads[T]) => void,
) {
	eventEmitter.on(event, callback);
}
