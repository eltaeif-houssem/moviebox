import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "@configs/firebase.config";
import { authErrorMessageHandler } from "@utils/auth.util";

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

  // verify user password
  async verifyPassword(email: string, password: string) {
    const user = auth.currentUser;
    try {
      let response = null;
      if (user) {
        const credential = EmailAuthProvider.credential(email, password);
        response = await reauthenticateWithCredential(user, credential);
      }
      return response;
    } catch (error: any) {
      const customError = authErrorMessageHandler(error);
      return { error: customError.error };
    }
  }

  // Delete user
  async deleteAccount(user: User) {
    try {
      await deleteUser(user);
      return { success: true };
    } catch (error: any) {
      const customError = authErrorMessageHandler(error);
      return { error: customError.error };
    }
  }
}

// Exporting authService instance
export const authService = new AuthService();
export default authService;
