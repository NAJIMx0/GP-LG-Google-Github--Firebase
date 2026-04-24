import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDD832U6aTMVPGmIW_2atzjk53fwRDbg9g",
  authDomain: "gp-auth-fe1c0.firebaseapp.com",
  projectId: "gp-auth-fe1c0",
  storageBucket: "gp-auth-fe1c0.firebasestorage.app",
  messagingSenderId: "618300285319",
  appId: "1:618300285319:web:77eac7841b5a081e627322",
  measurementId: "G-DHHQ9LZ4RL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signInWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  return result.user;
};

export const logOut = async () => {
  await signOut(auth);
};