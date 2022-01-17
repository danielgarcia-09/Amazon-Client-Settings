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
import { loadState, saveState } from "./config/state";

const persistedState = loadState();

const store: Store<UserState, AnyAction> & { dispatch: Dispatch } =
  createStore(userReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(()=> {
  saveState(store.getState());
})

export default store;
