import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, TOGGLE_ITEM } from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initial state
const initialState = {
  shoppingList: [],
};

// Helper function to save data to AsyncStorage
const saveToAsyncStorage = async (shoppingList) => {
  try {
    await AsyncStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  } catch (error) {
    console.error("Error saving shopping list to AsyncStorage:", error);
  }
};

// Helper function to load data from AsyncStorage
const loadFromAsyncStorage = async () => {
  try {
    const data = await AsyncStorage.getItem("shoppingList");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading shopping list from AsyncStorage:", error);
    return [];
  }
};

// Reducer function
const shoppingListReducer = (state = initialState, action) => {
  let updatedList = [];

  switch (action.type) {
    case ADD_ITEM:
      updatedList = [...state.shoppingList, action.payload];
      saveToAsyncStorage(updatedList); // Save the updated list
      return { ...state, shoppingList: updatedList };

    case EDIT_ITEM:
      updatedList = state.shoppingList.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updatedItem }
          : item
      );
      saveToAsyncStorage(updatedList); // Save the updated list
      return { ...state, shoppingList: updatedList };

    case DELETE_ITEM:
      updatedList = state.shoppingList.filter(
        (item) => item.id !== action.payload
      );
      saveToAsyncStorage(updatedList); // Save the updated list
      return { ...state, shoppingList: updatedList };

    case TOGGLE_ITEM:
      updatedList = state.shoppingList.map((item) =>
        item.id === action.payload
          ? { ...item, purchased: !item.purchased }
          : item
      );
      saveToAsyncStorage(updatedList); // Save the updated list
      return { ...state, shoppingList: updatedList };

    default:
      return state;
  }
};

// Middleware to load the shopping list initially
export const loadShoppingList = async (dispatch) => {
  const shoppingList = await loadFromAsyncStorage();
  dispatch({ type: "LOAD_SHOPPING_LIST", payload: shoppingList });
};

export default shoppingListReducer;
