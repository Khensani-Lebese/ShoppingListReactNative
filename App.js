import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { loadShoppingList } from "./redux/reducers";
import HomeScreen from "./Screens/HomeScreen";

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadShoppingList(dispatch); // Load initial data
  }, [dispatch]);

  return <HomeScreen />;
};

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
