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
    const users = await AsyncStorage.getItem("users");
    const parsedUsers = users ? JSON.parse(users) : [];

    const user = parsedUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }

    dispatch({
      type: "LOGIN_USER",
      payload: user,
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Product Actions
export const loadUserProducts = (email) => async (dispatch) => {
  try {
    const products = await AsyncStorage.getItem(`products_${email}`);
    dispatch({
      type: "LOAD_USER_PRODUCTS",
      payload: products ? JSON.parse(products) : [],
    });
  } catch (error) {
    console.error("Error loading user products:", error);
  }
};

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const editItem = (id, updatedItem) => ({
  type: EDIT_ITEM,
  payload: { id, updatedItem },
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

export const toggleItem = (id) => ({
  type: TOGGLE_ITEM,
  payload: id,
});
