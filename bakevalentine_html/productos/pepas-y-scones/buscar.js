document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    const buscador = document.getElementById("Buscador");

    const paginas = {
        "pepa de membrillo": "pepaMembrillo.html",
        "pepa membrillo": "pepaMembrillo.html",

        "pepa de batata": "pepaBatata.html",
        "pepa batata": "pepaBatata.html",

        "pepa de dulce de leche": "pepaDdl.html",
        "pepa dulce de leche": "pepaDdl.html",

        "scone": "scone.html",
        "scones": "scone.html",
        "cones": "scone.html",
    };

    function buscar() {
        const termino = buscador.value.trim().toLowerCase();

        if (!termino) {
            location.href = "../error-busqueda.html";
            return;
        }

        // separar palabras
        const palabras = termino.split(/\s+/);

        // buscar coincidencias
        const pagina = Object.keys(paginas).find(key =>
            palabras.every(palabra => key.includes(palabra))
        );

        if (pagina) {
            location.href = paginas[pagina];
        } else {
            location.href = "error-busqueda.html";
        }
    }

    btnBuscar.addEventListener("click", buscar);
    buscador.addEventListener("keyup", (e) => {
        if (e.key === "Enter") buscar();
    });
});
