import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa6QV5GXPbv5L8rUel83syephhpstEli0",
  authDomain: "bluesheep-f16fa.firebaseapp.com",
  projectId: "bluesheep-f16fa",
  storageBucket: "bluesheep-f16fa.appspot.com",
  messagingSenderId: "138666047302",
  appId: "1:138666047302:web:6a62f76ffa64549ce51747",
  measurementId: "G-YX32YJNDZZ",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, firestore, storage, db };
