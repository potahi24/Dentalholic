import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCas5y6e9BPJ2YPsauQkAjFFlvItpdbNpI",
  authDomain: "dentalholic-e9169.firebaseapp.com",
  projectId: "dentalholic-e9169",
  appId: "1:781717881952:web:5f45d1eacb35323d312f05"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();