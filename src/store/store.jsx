import { configureStore, combineReducers } from "@reduxjs/toolkit";
import questionsReducer from './questionsSlice';

import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({
    questions: questionsReducer,
})

const persistConfig = {
    key: "quiz",
    storage,
    whitelist:["questions"]
};

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;