document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    const buscador = document.getElementById("Buscador");

    const paginas = {
        "cookie de chips": "cookieChips.html",
        "cookie chips": "cookieChips.html",
        "cookie de kinder": "cookieKinder.html",
        "cookie kinder": "cookieKinder.html",
        "cookie de oreo": "cookieOreo.html",
        "cookie oreo": "cookieOreo.html",
        "cookie de ferrero": "cookieFerrero.html",
        "cookie ferrero": "cookieFerrero.html",
        "cookie de ferrero rocher": "cookieFerrero.html",
        "cookie ferrero rocher": "cookieFerrero.html",
        "cookie de limón": "cookieLimon.html",
        "cookie limón": "cookieLimon.html",
        "cookie de limon": "cookieLimon.html",
        "cookie limon": "cookieLimon.html",
        "cookie de red velvet": "cookieLimon.html",
        "cookie red velvet": "cookieLimon.html",
        "cookie de bonobon": "cookieBonoBon.html",
        "cookie de bon o bon": "cookieBonoBon.html",
        "cookie bon o bon": "cookieBonoBon.html",
        "cookie de bon o bon": "cookieBonoBon.html",

        "cookie de chips rellena": "cookieChipsRellena.html",
        "cookie chips rellena": "cookieChipsRellena.html",
        "cookie de kinder rellena": "cookieKinderRellena.html",
        "cookie kinder rellena": "cookieKinderRellena.html",
        "cookie de oreo rellena": "cookieOreoRellena.html",
        "cookie oreo rellena": "cookieOreoRellena.html",
        "cookie de ferrero rellena": "cookieFerreroRellena.html",
        "cookie ferrero rellena": "cookieFerreroRellena.html",
        "cookie de ferrero rocher rellena": "cookieFerreroRellena.html",
        "cookie ferrero rocher rellena": "cookieFerreroRellena.html",
        "cookie de limón rellena": "cookieLimonRellena.html",
        "cookie limón rellena": "cookieLimonRellena.html",
        "cookie de limon rellena": "cookieLimonRellena.html",
        "cookie limon rellena": "cookieLimonRellena.html",
        "cookie de red velvet rellena": "cookieLimonRellena.html",
        "cookie red velvet rellena": "cookieLimonRellena.html",
        "cookie de bonobon rellena": "cookieBonoBonRellena.html",
        "cookie de bon o bon rellena": "cookieBonoBonRellena.html",
        "cookie bon o bon rellena": "cookieBonoBonRellena.html",
        "cookie de bon o bon rellena": "cookieBonoBonRellena.html",
        "cookie de block rellena": "cookieBlockRellena.html",
        "cookie de block": "cookieBlock.html",
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
