import EventEmitter from 'eventemitter3';

export enum EmitterEvents {
	MODAL_OPEN_CREATE_COLLECTION = 'modal/open/create/collection',
}

export const eventEmitter = new EventEmitter();
