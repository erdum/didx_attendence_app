import app from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signIn = async (callback) => {
	const result = await signInWithPopup(auth, provider);
	const user = result?.user?.providerData[0];
	callback(user);
};

const autoSignIn = (callback) => {
	onAuthStateChanged(auth, (user) => callback(user?.providerData[0] ?? null));
};

export { signIn, autoSignIn };
