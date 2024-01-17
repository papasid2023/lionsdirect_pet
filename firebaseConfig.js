import { initializeApp} from "firebase/app";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, getDoc, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAY4Dt79aGkqn3QJGrHeVydg68kzWyYWLw",
  authDomain: "lionsdirect-7893e.firebaseapp.com",
  projectId: "lionsdirect-7893e",
  storageBucket: "lionsdirect-7893e.appspot.com",
  messagingSenderId: "962226612056",
  appId: "1:962226612056:web:d70ce8d5f1b39c7bea272d"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const FIREBASE_DB = getFirestore(FIREBASE_APP);

export {FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, getDoc, addDoc};