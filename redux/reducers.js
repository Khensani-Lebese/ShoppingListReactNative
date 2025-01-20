import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  currentUser: null,
  products: [], // This represents the shopping list items.
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

    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: null,
        products: [],
      };

    case "LOAD_USER_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_ITEM":
      const newProduct = action.payload;
      const updatedProducts = [...state.products, newProduct];
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

    case "DELETE_ITEM":
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

    case "TOGGLE_ITEM":
      const toggledProducts = state.products.map((product) =>
        product.id === action.payload
          ? { ...product, purchased: !product.purchased }
          : product
      );
      try {
        AsyncStorage.setItem(
          `products_${state.currentUser.email}`,
          JSON.stringify(toggledProducts)
        );
      } catch (error) {
        console.error("Error toggling product:", error);
      }
      return {
        ...state,
        products: toggledProducts,
      };

    default:
      console.log("Reducer called with state:", state);
      return state;
  }
};

export default appReducer;
