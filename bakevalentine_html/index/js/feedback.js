const formFeedback = document.getElementById('form-feedback');
const modal = document.getElementById('modal-feedback');
const btn = document.getElementById('btn-feedback');
const close = document.getElementById('close-feedback');

// Abrir modal
btn.onclick = () => modal.style.display = "block";

// Cerrar modal
close.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

// Enviar feedback
formFeedback.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('NombreFeedback').value;
    const email = document.getElementById('EmailFeedback').value;
    const mensaje = document.getElementById('MensajeFeedback').value;

    try {
        const res = await fetch('http://localhost:3000/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono: '', email, mensaje })
        });

        const data = await res.json();

        if(data.success) {
            alert('✅ Feedback enviado correctamente');
            formFeedback.reset();
            modal.style.display = "none";
        } else {
            alert('❌ Error al enviar el feedback');
        }
    } catch(err) {
        console.error(err);
        alert('❌ Error al conectar con el servidor');
    }
});
