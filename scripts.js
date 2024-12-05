const imagenes = document.querySelector(".imagenes");
const totalImagenes = document.querySelectorAll(".imagen").length;
let indiceActual = 0;

function avanzarCortinilla() {
  const ancho = document.querySelector(".cortinilla").clientWidth;
  indiceActual++;

  // Si hemos llegado al final (la imagen duplicada), reiniciamos la posición sin transición
  if (indiceActual >= totalImagenes - 1) {
    imagenes.style.transition = "none";
    imagenes.style.transform = `translateX(0)`;
    indiceActual = 0;
    // Después de reiniciar, reactivamos la transición y avanzamos a la segunda imagen
    setTimeout(() => {
      imagenes.style.transition = "transform 2s ease-in-out";
      avanzarCortinilla();
    }, 50); // Esperamos un poco para que la transición se active correctamente
  } else {
    imagenes.style.transform = `translateX(-${indiceActual * ancho}px)`;
  }
}

setInterval(avanzarCortinilla, 3000);

// Función para abrir y cerrar el menú
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}
