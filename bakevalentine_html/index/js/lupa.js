const btnBuscar = document.getElementById('btn-buscar');
const inputBuscar = document.getElementById('Buscador');

btnBuscar.addEventListener('click', () => {
if (inputBuscar.style.display === 'none' || inputBuscar.style.display === '') {
inputBuscar.style.display = 'inline-block'; // Mostrar input
inputBuscar.focus(); // Poner el cursor dentro
} else {
inputBuscar.style.display = 'none'; // Ocultar input al tocar de nuevo
}
});