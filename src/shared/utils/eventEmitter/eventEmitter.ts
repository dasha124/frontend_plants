import EventEmitter from 'eventemitter3';

export enum EmitterEvents {
	MODAL_OPEN_CREATE_COLLECTION = 'modal/open/create/collection',
	MODAL_OPEN_DELETE_COLLECTION = 'modal/open/delete/collection',
}

export const eventEmitter = new EventEmitter();
