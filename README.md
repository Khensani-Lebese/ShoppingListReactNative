Shopping List App

This is a mobile application built using React Native, Redux, and AsyncStorage. The app allows users to register, log in, add products to their shopping list, and manage those products. Products are persisted using AsyncStorage, and each user has their own unique list of products stored.

Feature

User Registration and Login
Users can register with an email, password, and name.
Passwords are securely encrypted using AES encryption.
Users can log in using their email and password, and their credentials are securely decrypted.

Manage Products
After logging in, users can add products to their shopping list.
Products are saved to AsyncStorage and can be retrieved when the user logs in again.

View Shopping List
Users can view their saved products once logged in.
The shopping list is dynamically updated in real-time.

Product Management
Users can edit product names and mark them as purchased.
Users can delete products from their shopping list.

Logout
Users can log out of their account and will be redirected to the login screen.
Installation
Follow these steps to install and run the app:

Clone the repository:

bash
Copy
Edit
git clone https://github.com/Khensani-Lebese/shopping-list-app.git
Install dependencies:

bash
Copy
Edit
cd shopping-list-app
npm install
Install dependencies for React Native:

bash
Copy
Edit
npm install @react-native-async-storage/async-storage @react-redux/redux-thunk redux react-redux crypto-js
Start the app:

bash
Copy
Edit
npx react-native run-android # For Android
npx react-native run-ios # For iOS

Technologies Used

React Native for mobile app development
Redux for state management
AsyncStorage for persisting data locally on the device
CryptoJS for securely encrypting and decrypting passwords
React Navigation for routing between screens

Folder Structure
plaintext
Copy
Edit
src/
├── components/
│ ├── AddItemForm.js # Form to add a new product
│ ├── Home.js # Home screen to display the shopping list
│ └── ShoppingItem.js # Component to display each product
├── redux/
│ ├── actions.js # Redux actions to manage products and user login
│ ├── reducer.js # Redux reducer to handle state changes
│ └── store.js # Redux store setup
├── screens/
│ ├── Login.js # Login screen
│ └── Register.js # Register screen
└── App.js # Main app entry point

How It Works

Registration
The user registers by providing an email, password, and name.
The password is encrypted using AES encryption before being stored in AsyncStorage.
Upon successful registration, the user is redirected to the login screen.

Login
The user logs in by entering their email and password.
The app decrypts the stored password using the same encryption key.
If the credentials match, the user is logged in and redirected to the home screen.
The user's products are fetched from AsyncStorage and displayed.

Managing Products
On the home screen, users can add, edit, or delete products in their shopping list.
Products are stored in AsyncStorage, and updates are reflected immediately.

Logout
Users can log out, which clears the current user from the Redux store and navigates them back to the login screen.

Future Improvements
Authentication with Backend: Add a backend server to handle authentication and user data securely.
User Profile: Allow users to update their profiles (e.g., name, email).
Product Categories: Allow users to categorize their products (e.g., groceries, electronics).
Search Functionality: Add a search feature to filter products by name.

License
This project is licensed under the MIT License - see the LICENSE file for details.
