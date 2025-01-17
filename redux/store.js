import { createStore } from "redux";
import appReducer from "./reducers"; // Make sure this path is correct

const store = createStore(appReducer); // Ensure you’re passing a valid reducer

console.log("Redux store created:", store.getState());

export default store;
