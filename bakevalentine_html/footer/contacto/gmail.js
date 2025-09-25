const form = document.getElementById('form-contacto');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    // Obtener datos del formulario
    const nombre = document.getElementById('Nombre').value;
    const telefono = document.getElementById('Telefono').value;
    const email = document.getElementById('Email').value;
    const mensaje = document.getElementById('Mensaje').value;

    try {
        const res = await fetch('http://localhost:3000/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, telefono, email, mensaje })
        });

        const data = await res.json();

        if (data.success) {
            alert('✅ Mensaje enviado correctamente');
            form.reset();
        } else {
            alert('❌ Error al enviar el mensaje');
        }

    } catch (error) {
        console.error(error);
        alert('❌ Error al conectar con el servidor');
    }
});
