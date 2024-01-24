import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSRwMTBa2b_No5vJxOkKzm60AuOvrjrME",
  authDomain: "call-center-479f7.firebaseapp.com",
  projectId: "call-center-479f7",
  storageBucket: "call-center-479f7.appspot.com",
  messagingSenderId: "1021229842529",
  appId: "1:1021229842529:web:cc31e99df7ff702220ea20",
  measurementId: "G-Z4VTVX3VM1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export {
  storage,
  auth,
  app,
  db,
  collection,
  setDoc,
  getDoc,
  addDoc,
  getFirestore,
  getDocs,
  updateDoc,
  doc,
};
