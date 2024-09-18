import { AuthError } from "firebase/auth";

export const authErrorMessageHandler = (error: AuthError) => {
  if (error.code === "auth/invalid-credential") {
    return { error: "Invalid credentials." };
  } else if (error.code === "auth/user-not-found") {
    return { error: "No user found with this email." };
  } else if (error.code === "auth/wrong-password") {
    return { error: "Incorrect password. Please try again." };
  } else if (error.code === "auth/too-many-requests") {
    return { error: "Too many failed login attempts. Please try again later." };
  } else {
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
