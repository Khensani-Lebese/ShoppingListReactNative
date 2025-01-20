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
      let userProducts = [];
      try {
        const savedProducts = AsyncStorage.getItem(
          `products_${action.payload.email}`
        );
        userProducts = savedProducts ? JSON.parse(savedProducts) : [];
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
      return {
        ...state,
        currentUser: { email: action.payload.email, name: action.payload.name },
        products: action.payload.products, // Store products
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

    case "EDIT_ITEM":
      const editedProducts = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, name: action.payload.name }
          : product
      );
      try {
        AsyncStorage.setItem(
          `products_${state.currentUser.email}`,
          JSON.stringify(editedProducts)
        );
      } catch (error) {
        console.error("Error editing product:", error);
      }
      return {
        ...state,
        products: editedProducts,
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "CLEAR_PRODUCTS":
      return {
        ...state,
        products: [],
      };

    default:
      console.log("Reducer called with state:", state);
      return state;
  }
};

export default appReducer;
