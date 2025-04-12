import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	CollectionInfo,
	TCollectionShortInfo,
} from '@/entities/collection/model/collectionInfo.ts';
import { RootState } from '@/shared/model/store';

type CollectionSlice = {
	collectionList: TCollectionShortInfo[];
	collectionInfo: CollectionInfo | null;
};

const initialState: CollectionSlice = {
	collectionList: [],
	collectionInfo: null,
};

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		setCollections: (state, action: PayloadAction<TCollectionShortInfo[]>) => {
			state.collectionList = action.payload;
		},
		setCollection: (state, action: PayloadAction<CollectionInfo>) => {
			state.collectionInfo = action.payload;
		},
		deleteCollections: (state) => {
			state.collectionList = [];
		},
		deleteCollection: (state) => {
			state.collectionInfo = null;
		},
	},
});

export const selectCollections = (
	state: RootState,
): CollectionSlice['collectionList'] => state.collection.collectionList;

export const selectCollection = (
	state: RootState,
): CollectionSlice['collectionInfo'] => state.collection.collectionInfo;

export const {
	setCollections: setCollectionsAction,
	setCollection: setCollectionAction,
	deleteCollections: deleteCollectionsAction,
	deleteCollection: deleteCollectionAction,
} = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
