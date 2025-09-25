window.addEventListener("DOMContentLoaded", () => {
  // fade-in del body
  document.body.classList.add("loaded");

  // animación secuencial de secciones
  const elements = [
    document.querySelector("header"),
    document.querySelector(".datos"),
    document.querySelector("footer")
  ];

  elements.forEach((el, i) => {
    setTimeout(() => {
      if (el) el.classList.add("show");
    }, i * 400); // 400ms de diferencia entre cada sección
  });
});
