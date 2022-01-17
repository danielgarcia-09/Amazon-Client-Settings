import {
  Store,
  Dispatch,
  AnyAction,
  createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import userReducer from "./store/reducers/userReducer";
import { UserState } from "./types";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store: Store<UserState, AnyAction> & { dispatch: Dispatch } =
  createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);

