// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNF7yDVZOydEmnGM3G12Rp8-MJtkswbCg",
  authDomain: "fonts-38282.firebaseapp.com",
  projectId: "fonts-38282",
  storageBucket: "fonts-38282.appspot.com",
  messagingSenderId: "11198339243",
  appId: "1:11198339243:web:06d180a62337d373f47fee",
  measurementId: "G-FTHZ1R9RB7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const cloud = getStorage(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
auth.useDeviceLanguage();
