import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

export async function loginConGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Login con Google exitoso:", user);
    // Redirigir al inicio
    location.href = "../../index/index.html"; // ajustá la ruta según tu proyecto
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    alert("No se pudo iniciar sesión con Google");
  }
}
