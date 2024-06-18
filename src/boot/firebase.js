import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZxC0Dc6hwpYXdezLT73peRowxLiY4N0E",
  authDomain: "gb-bakeshop-426e9.firebaseapp.com",
  projectId: "gb-bakeshop-426e9",
  storageBucket: "gb-bakeshop-426e9.appspot.com",
  messagingSenderId: "815102258489",
  appId: "1:815102258489:web:7480b27ee878dcb6a60ce8",
  measurementId: "G-HXT9SK5PCF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
