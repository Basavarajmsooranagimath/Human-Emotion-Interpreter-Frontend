import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNcLCj--ka1tFe7cq4ro800AbRqjSKhWE",
  authDomain: "sentiment-analysis-prediction.firebaseapp.com",
  projectId: "sentiment-analysis-prediction",
  storageBucket: "sentiment-analysis-prediction.firebasestorage.app",
  messagingSenderId: "470332108853",
  appId: "1:470332108853:web:d1c520fbce2c4cd6cbc17c",
};

export const app = initializeApp(firebaseConfig);
