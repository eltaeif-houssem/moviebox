import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "@configs/firebase.config";
import { authErrorMessageHandler } from "@/utils/auth.util";

const { VITE_APP_FIREBASE_APP_DOMAIN_NAME } = import.meta.env;

class AuthService {
  // Sign up method
  async signup(email: string, password: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user;
    } catch (error: any) {
      const customError = authErrorMessageHandler(error);
      return { error: customError.error };
    }
  }

  // Sign in method
  async signin(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error: any) {
      const customError = authErrorMessageHandler(error);
      return { error: customError.error };
    }
  }

  // Password reset method
  async forgetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${VITE_APP_FIREBASE_APP_DOMAIN_NAME}/auth/signin`,
      });
      return { success: `A password reset email was sent to ${email}` }; // Return success
    } catch (error: any) {
      const customError = authErrorMessageHandler(error);
      return { error: customError.error };
    }
  }

  // Sign out method
  async signout() {
    try {
      await signOut(auth);
      return { success: true }; // Return success message
    } catch (error: any) {
      const customError = authErrorMessageHandler(error);
      return { error: customError.error };
    }
  }
}

// Exporting authService instance
export const authService = new AuthService();
export default authService;
