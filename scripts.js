// CERRAR MENU EN CLICK

//CORTINILLA

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

//MENU
gsap.registerPlugin(ScrollTrigger);

// Función para abrir y cerrar el menú
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}

const menuIcon = document.querySelector(".menu-icon");
let isRotated = false;

menuIcon.addEventListener("click", () => {
  if (isRotated) {
    // Restaura la rotación a 0 grados
    gsap.to(menuIcon, {
      rotation: 0,
      duration: 0.3,
      ease: "power1.out",
    });
  } else {
    // Rota el elemento 90 grados
    gsap.to(menuIcon, {
      rotation: 90,
      duration: 0.3,
      ease: "power1.out",
    });
  }
  isRotated = !isRotated; // Alterna el estado de la rotación
});

// Asegúrate de que GSAP y ScrollTrigger están correctamente registrados
gsap.registerPlugin(ScrollTrigger);

// Selección de todos los divs interactivos
const interactiveDivs = document.querySelectorAll(".interactive-div");

interactiveDivs.forEach((div) => {
  const description = div.querySelector(".descripcion-1");
  const span = div.querySelector(".h2-animado-1");

  // Configuración de GSAP + ScrollTrigger para cada elemento
  gsap
    .timeline({
      scrollTrigger: {
        trigger: div, // Cada div interactivo tiene su propio trigger
        start: "top 80%", // Comienza cuando el top del div llega al 75% de la pantalla
        end: "bottom 70%", // Termina cuando el bottom del div llega al 65% de la pantalla
        scrub: 0.1, // Sincroniza con el scroll
        onUpdate: (self) => {
          // Se ejecuta cada vez que el scroll se actualiza
          const currentPosition = div.getBoundingClientRect(); // Obtener la posición actual del div
          console.log(
            `Posición dinámica de ${div.className}:`,
            currentPosition
          );

          // Aquí es donde realmente puedes hacer que las animaciones se actualicen dinámicamente
          const progress = self.progress; // La posición del trigger con respecto al desplazamiento
          console.log("Progress", progress);
        },
      },
    })
    // Animación del span (h2)
    .to(span, {
      y: -44, // Movimiento hacia arriba
      opacity: 1,
      duration: 0.01, // Duración suave
      ease: "none",
    })
    // Animación de la descripción
    .to(
      description,
      {
        y: 22, // Movimiento hacia abajo
        opacity: 1,
        duration: 0.01,
        ease: "none",
      },
      "<" // Se ejecuta al mismo tiempo que la animación anterior
    );
});

// Seleccionar los elementos grid-item
const gridItems = document.querySelectorAll(".grid-item");

// Iterar sobre cada grid-item y aplicar la animación con GSAP
gridItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Cambiar el fondo a amarillo cuando el cursor entra
    gsap.to(item, { backgroundColor: "#577e80", duration: 0.55 });
  });

  item.addEventListener("mouseleave", () => {
    // Volver al color original cuando el cursor sale
    gsap.to(item, { backgroundColor: "", duration: 0.55 });
  });
});

// Agregar animaciones al hover
gridItems.forEach((item) => {
  const h2 = item.querySelector("h2");

  item.addEventListener("mouseenter", () => {
    // Animar la opacidad y posición del texto
    gsap.to(h2, {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    // Ocultar el texto al quitar el hover
    gsap.to(h2, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
    });
  });
});

gridItems.forEach((item) => {
  // Configuración de GSAP + ScrollTrigger
  gsap
    .timeline({
      scrollTrigger: {
        trigger: item, // Cada .grid-item será el activador
        start: "top 93%", // Cuando el elemento entra en la vista
        end: "top 70%", // Cuando el elemento llega al centro de la pantalla
        scrub: true, // Proporcional al scroll
      },
    })
    .to(item, {
      height: "25vh", // Altura final
      ease: "none", // Movimiento directo, sin suavidad
    });
});

// Selección de elementos .grid-item h2
const gridItemHeadings = document.querySelectorAll(".grid-item h2");

gridItemHeadings.forEach((heading) => {
  // Configuración de GSAP + ScrollTrigger
  gsap
    .timeline({
      scrollTrigger: {
        trigger: heading, // Cada h2 dentro de .grid-item será el activador
        start: "top 93%", // Cuando el elemento entra en la vista
        end: "top 70%", // Cuando el elemento llega al centro de la pantalla
        scrub: true, // Proporcional al scroll
      },
    })
    .to(heading, {
      fontSize: "2em", // Tamaño final de la fuente
      ease: "none", // Movimiento directo, sin suavidad
    });
});

// Seleccionar todos los elementos con la clase .cortinilla
const cortinillas = document.querySelectorAll(".cortinilla");

// Iterar sobre cada elemento y aplicar la animación
cortinillas.forEach((item) => {
  // Configuración de GSAP + ScrollTrigger
  gsap
    .timeline({
      scrollTrigger: {
        trigger: item, // Cada .cortinilla será el activador
        start: "top 99%", // Cuando el elemento entra en la vista (arriba del 95% de la pantalla)
        end: "top 50%", // Cuando el elemento llega al centro de la pantalla
        scrub: true, // Hacer la animación proporcional al scroll
      },
    })
    .to(item, {
      height: "90vh", // Altura final (la animación de altura será a 90vh)
      ease: "none", // Movimiento directo, sin suavidad
    });
});

// Iterar sobre cada elemento y aplicar la animación
imagenes.forEach((item) => {
  // Configuración de GSAP + ScrollTrigger
  gsap
    .timeline({
      scrollTrigger: {
        trigger: item, // Cada .imagenes será el activador
        start: "top 99%", // Cuando el elemento entra en la vista (arriba del 99% de la pantalla)
        end: "top 50%", // Cuando el elemento llega al centro de la pantalla
        scrub: true, // Hacer la animación proporcional al scroll
      },
    })
    .to(item, {
      height: "100vh", // Altura final (la animación de altura será a 90vh)
      ease: "none", // Movimiento directo, sin suavidad
    });
});
