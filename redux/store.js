import { createStore } from "redux";
import shoppingListReducer from "./reducers";

const store = createStore(shoppingListReducer);

export default store;
