import AsyncStorage from "@react-native-async-storage/async-storage";

export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";

// User Actions
export const registerUser = (userData) => async (dispatch) => {
  try {
    const existingUsers = await AsyncStorage.getItem("users");
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    const isExisting = users.find((user) => user.email === userData.email);

    if (isExisting) {
      throw new Error("User already exists");
    }

    users.push(userData);
    await AsyncStorage.setItem("users", JSON.stringify(users));

    dispatch({
      type: "REGISTER_USER",
      payload: userData,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    // Simulate fetching user data (replace with your real API logic if necessary)
    const storedUser = await AsyncStorage.getItem(`user_${email}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        dispatch({ type: "LOGIN_USER", payload: user });
      } else {
        throw new Error("Invalid password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Product Actions
export const addItem = (item) => ({
  type: "ADD_ITEM",
  payload: item,
});

export const deleteItem = (id) => ({
  type: "DELETE_ITEM",
  payload: id,
});

export const toggleItem = (id) => ({
  type: "TOGGLE_ITEM",
  payload: id,
});

export const loadUserProducts = (products) => ({
  type: "LOAD_USER_PRODUCTS",
  payload: products,
});

export const editItem = (id, name) => ({
  type: "EDIT_ITEM",
  payload: { id, name },
});

export const setProducts = (products) => ({
  type: "SET_PRODUCTS",
  payload: products,
});

export const addProduct = (product) => ({
  type: "ADD_PRODUCT",
  payload: product,
});

export const removeProduct = (productId) => ({
  type: "REMOVE_PRODUCT",
  payload: productId,
});
export const logoutUser = () => ({
  type: "LOGOUT_USER",
});
