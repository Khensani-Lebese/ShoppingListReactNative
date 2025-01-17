import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  currentUser: null,
  products: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "LOAD_USER_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_PRODUCT":
      const updatedProducts = [...state.products, action.payload];
      try {
        AsyncStorage.setItem(
          `products_${state.currentUser.email}`,
          JSON.stringify(updatedProducts)
        );
      } catch (error) {
        console.error("Error saving products:", error);
      }
      return {
        ...state,
        products: updatedProducts,
      };

    case "DELETE_PRODUCT":
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      try {
        AsyncStorage.setItem(
          `products_${state.currentUser.email}`,
          JSON.stringify(filteredProducts)
        );
      } catch (error) {
        console.error("Error deleting products:", error);
      }
      return {
        ...state,
        products: filteredProducts,
      };

    default:
      console.log("Reducer called with state:", state);
      return state;
  }
};

export default appReducer;
