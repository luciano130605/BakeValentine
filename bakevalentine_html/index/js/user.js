// sessionCheck.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

/**
 * Actualiza el ícono del usuario según si hay sesión (backend o Google)
 */
export async function updateUserIcon() {
    const userIcon = document.getElementById("user-icon");
    if (!userIcon) return;

    try {
        // Consulto backend
        const res = await axios.get("http://127.0.0.1:3000/check-session", { withCredentials: true });
        const backendLogged = res.data.logged;

        // Consulto Firebase
        const currentUser = auth.currentUser;

        if (backendLogged || currentUser) {
            userIcon.className = "fa-solid fa-user"; // 👤 usuario logueado
        } else {
            userIcon.className = "fa-solid fa-right-to-bracket"; // 🔑 sin sesión
        }
    } catch (err) {
        console.error("Error al verificar sesión:", err.message);
        userIcon.className = "fa-solid fa-right-to-bracket";
    }
}

/**
 * Redirige al usuario según su sesión
 */
export function goToUser() {
    // Esperamos a que Firebase cargue el usuario
    onAuthStateChanged(auth, async (user) => {
        try {
            const res = await axios.get("http://127.0.0.1:3000/check-session", { withCredentials: true });
            const backendLogged = res.data.logged;

            if (backendLogged || user) {
                location.href = "../footer/usuario/usuario.html";
            } else {
                location.href = "../footer/login/login.html";
            }
        } catch (err) {
            location.href = "../footer/login/login.html";
        }
    });
}

/**
 * Observa cambios en Firebase (login/logout Google) y actualiza ícono automáticamente
 */
onAuthStateChanged(auth, () => {
    updateUserIcon();
});

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", updateUserIcon);
