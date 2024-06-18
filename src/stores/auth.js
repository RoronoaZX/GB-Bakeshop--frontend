import { defineStore } from "pinia";
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref();

  const logIn = async (credentials) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    user.value = userCredential.user;
  };

  return { user, logIn };
});
