// Navegación y scroll
let activar = 'inicio';
let menuMovil = false;

function scrollToSection(event, seccion) {
   if (event) event.preventDefault();
   const elemento = document.getElementById(seccion);
   if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
   }
   cerrarMovil();
}

function toogleMovil() {
   const menu = document.getElementById('menu');
   const menuIcono = document.getElementById('menuIcono');

   menuMovil = !menuMovil;
   menu.classList.toggle('activa');
   menuIcono.textContent = menuMovil ? '✕' : '☰';
}

function cerrarMovil() {
   const menu = document.getElementById('menu');
   const menuIcono = document.getElementById('menuIcono');

   menuMovil = false;
   menu.classList.remove('activa');
   menuIcono.textContent = '☰';
}

function ActualizarNav(seccion) {
   const menu = document.querySelectorAll('.nav-link');
   menu.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === seccion) {
         link.classList.add('active');
      }
   });
   activar = seccion;
}

function DetectarNav() {
   const sections = ['inicio', 'about', 'Proyectos', 'Estudios', 'Tecnologias', 'contacto'];
   let currentSection = sections[0];
   let minDiff = Infinity;
   sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
         const rect = section.getBoundingClientRect();
         const diff = Math.abs(rect.top);
         if (rect.top <= window.innerHeight * 0.5 && diff < minDiff) {
            minDiff = diff;
            currentSection = id;
         }
      }
   });
   if (activar !== currentSection) {
      ActualizarNav(currentSection);
   }
}

window.addEventListener('scroll', DetectarNav);
window.addEventListener('DOMContentLoaded', DetectarNav);
