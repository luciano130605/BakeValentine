window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const main   = document.querySelector("main");
  const footer = document.querySelector("footer");

  // aparece primero el header
  setTimeout(() => header.classList.add("show"), 200);

  // luego el main
  setTimeout(() => main.classList.add("show"), 600);

  // y al final el footer
  setTimeout(() => footer.classList.add("show"), 1000);
});


window.addEventListener("DOMContentLoaded", () => {
    // Primero animamos el body
    document.body.classList.add("loaded");

    // Luego las secciones en secuencia
    const elements = [
        document.querySelector("header"),
        document.querySelector("input"),
        document.querySelector(".container"),
        document.querySelector("footer")
    ];

    elements.forEach((el, i) => {
        setTimeout(() => {
            if (el) el.classList.add("show");
        }, i * 400); // 400ms de diferencia entre cada sección
    });
});

