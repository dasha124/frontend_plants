import { configureStore } from '@reduxjs/toolkit';

import { collectionReducer } from '@/entities/collection/model';
import { userReducer } from '@/entities/user/model';

export const store = configureStore({
	reducer: {
		user: userReducer,
		collection: collectionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
