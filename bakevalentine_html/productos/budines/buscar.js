document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    const buscador = document.getElementById("Buscador");

    const paginas = {
        "budin de vainilla": "budinVainilla.html",
        "budin vainilla": "budinVainilla.html",
        "budín de vainilla": "budinVainilla.html",
        "budín vainilla": "budinVainilla.html",

        "budin de chocolate": "budinChocolate.html",
        "budin chocolate": "budinChocolate.html",
        "budín de chocolate": "budinChocolate.html",
        "budín chocolate": "budinChocolate.html",

        "budin de chocolate con chips": "budinChocolateChips.html",
        "budin chocolate con chips": "budinChocolateChips.html",
        "budin chocolate chips": "budinChocolateChips.html",
        "budín de chocolate con chips": "budinChocolateChips.html",
        "budín chocolate con chips": "budinChocolateChips.html",
        "budín chocolate chips": "budinChocolateChips.html",

        "budin marmolado": "budinMarmolado.html",
        "budín marmolado": "budinMarmolado.html",

        "budin de limón con glase": "budinLimon.html",
        "budin de limon con glase": "budinLimon.html",
        "budin limon con glase": "budinLimon.html",
        "budin limon glase": "budinLimon.html",
        "budin de limon": "budinLimon.html",
        "budín de limón con glase": "budinLimon.html",
        "budín de limon con glase": "budinLimon.html",
        "budín limon con glase": "budinLimon.html",
        "budín limon glase": "budinLimon.html",
        "budín de limon": "budinLimon.html"
        ,
        "budin de naranja con glase": "budinNaranja.html",
        "budin de naranja con glase": "budinNaranja.html",
        "budin naranja glase": "budinNaranja.html",
        "budin de naranja": "budinNaranja.html",
        "budín de naranja con glase": "budinNaranja.html",
        "budín naranja con glase": "budinNaranja.html",
        "budín naranja glase": "budinNaranja.html",
        "budín de naranja": "budinNaranja.html",

        "budin de banana con chips": "budinBanana.html",
        "budin banana con chips": "budinBanana.html",
        "budin banana chips": "budinBanana.html",
        "budin banana": "budinBanana.html",
        "budín de banana con chips": "budinBanana.html",
        "budín banana con chips": "budinBanana.html",
        "budín banana chips": "budinBanana.html",
        "budín banana": "budinBanana.html",

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
