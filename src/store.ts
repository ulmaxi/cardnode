import { Action, ActionCreatorWithPayload, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authentication/store/auth-slice';
import prescriptionReducer from './prescriptions/store/prescription-slice';
import userReducer from './users/store/users-slice';

/**
 * interface for store Actions
 */
export type StoreAction<T> = { type: string; payload: T };

/**
 * interface for the dispatcher type
 */
export type Dispatcher<P = any> = (
  action: ActionCreatorWithPayload<P> | Action,
) => void;

/**
 * returns the store structure at the moment
 */
export type GetStore = () => RootState;

/**
 * type interface for thunk action
 */
export type ThunkedAction = (dispatch: Dispatcher, getStore: GetStore) => void;

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  prescriptionReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;

let persistor = persistStore(store);

export default () => ({ store, persistor });
