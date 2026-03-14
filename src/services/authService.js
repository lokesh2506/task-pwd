import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";

import { auth, googleProvider } from "./firebase";
import toast from "react-hot-toast";


// EMAIL SIGNUP
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Account created successfully");
    return userCredential.user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("Email already registered");
    } else {
      toast.error(error.message);
    }
    throw error;
  }
};

// EMAIL LOGIN
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Login successful");
    return userCredential.user;
  } catch (error) {
    toast.error("Invalid email or password");
    throw error;
  }
};



// GOOGLE LOGIN
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    toast.success("Google login successful");
    return result.user;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};



// LOGOUT
export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out");
  } catch (error) {
    toast.error(error.message);
  }
};