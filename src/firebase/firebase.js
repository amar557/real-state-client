import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8DtakUhQSHxfe6BBdAUPKa2D7Tt0ygGA",
  authDomain: "real-estate-20b87.firebaseapp.com",
  projectId: "real-estate-20b87",
  storageBucket: "real-estate-20b87.appspot.com",
  messagingSenderId: "623855627287",
  appId: "1:623855627287:web:d0b80d638bd4a2d6a0c052",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
