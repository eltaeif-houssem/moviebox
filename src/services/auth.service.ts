import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "@configs/firebase.config";

class AuthService {
  async signup(email: string, password: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async signin(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  }

  async signout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }
}

export const authService = new AuthService();
export default authService;
