import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

async function registerUser() {
    alert("k")
    const nombre = document.getElementById("nombreCompleto").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!nombre || !email || !password || !confirmPassword) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (password.length < 4) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }
    try {
        const res = await api.post("/register", { nombre, email, password });
        alert(res.data.message);
        location.href = "../login/login.html";
    } catch (err) {
        alert(err.response?.data?.error || "Error en el registro");
    }
}