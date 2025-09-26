// Usar imports desde CDN, no require
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBsrgNx_gXD76ToYcbasqJyQcObqG8LJaM",
  authDomain: "loginbake-7bfcb.firebaseapp.com",
  projectId: "loginbake-7bfcb",
  storageBucket: "loginbake-7bfcb.appspot.com", // corregido
  messagingSenderId: "692584474455",
  appId: "1:692584474455:web:796a4cf6381aebc31c0012",
  measurementId: "G-YXV8HHDNB7"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
