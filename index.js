// index.js
import { registerRootComponent } from "expo"; // Use Expo's registerRootComponent
import React from "react";
import { Provider } from "react-redux"; // Import the Provider component from 'react-redux'
import store from "./redux/store"; // Ensure the correct path to your Redux store
import App from "./App"; // Ensure the correct path to your App component

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the app's root component
registerRootComponent(Root);
