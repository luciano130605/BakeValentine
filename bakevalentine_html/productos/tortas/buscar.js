document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    const buscador = document.getElementById("Buscador");

    const paginas = {
        "pastafrola de membrillo": "tortaPastafrolaMembrillo.html",
        "pastafrola de batata": "tortaPastafrolaBatata.html",
        "pastafrola de dulce de leche": "tortaPastafrolaDdl.html",
        "tarta de coco y dulce de leche": "tartaCocoDdl.html",
        "tarta de ricota": "tartaRicota.html",
        "tarta de ricota con dulce de leche": "tartaRicotaDdl.html",
        "lemon pie": "lemonPie.html",
        "chocotorta": "Chocotorta.html",
        "brownie , dulce de leche y merengue": "brownieDdlMerengue.html",
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
