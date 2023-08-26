import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqXLe_M0ULjL73ZTfo-AEuuoMs0tPhVFg",
  authDomain: "karpuz2-c32f7.firebaseapp.com",
  projectId: "karpuz2-c32f7",
  storageBucket: "karpuz2-c32f7.appspot.com",
  messagingSenderId: "483038809544",
  appId: "1:483038809544:web:fdc4819a0279a242e204fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const git_provider = new GithubAuthProvider();
