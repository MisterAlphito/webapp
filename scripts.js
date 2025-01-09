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

// Parallax cortinilla

const cortinillas = document.querySelectorAll(".cortinilla");

cortinillas.forEach((item) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 99%",
        end: "top 50%",
        scrub: true,
      },
    })
    .to(item, {
      height: "90vh", // Altura final
      ease: "none",
    });
});

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
    gsap.to(menuIcon, {
      rotation: 0,
      duration: 0.3,
      ease: "power1.out",
    });
  } else {
    gsap.to(menuIcon, {
      rotation: 90,
      duration: 0.3,
      ease: "power1.out",
    });
  }
  isRotated = !isRotated;
});

// Parallax textos pequeños

gsap.registerPlugin(ScrollTrigger);

const interactiveDivs = document.querySelectorAll(".div-parallax");

interactiveDivs.forEach((div) => {
  const description = div.querySelector(".descripcion-1");
  const span = div.querySelector(".h2-animado");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: div,
        start: "top 80%",
        end: "bottom 70%",
        scrub: 0.1,
        onUpdate: (self) => {
          // Se ejecuta cada vez que el scroll se actualiza
          const currentPosition = div.getBoundingClientRect(); // Obtener la posición actual del div
          console.log(
            `Posición dinámica de ${div.className}:`,
            currentPosition
          );

          const progress = self.progress;
          console.log("Progress", progress);
        },
      },
    })

    .to(span, {
      y: -44, // Movimiento hacia arriba
      opacity: 1,
      duration: 0.01,
      ease: "none",
    })

    .to(
      description,
      {
        y: 22, // Movimiento hacia abajo
        opacity: 1,
        duration: 0.01,
        ease: "none",
      },
      "<"
    );
});

// GALERÍA

// Interacciones galería

const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Cambiar el fondo a azul cuando el cursor entra
    gsap.to(item, { backgroundColor: "#577e80", duration: 0.55 });
  });

  item.addEventListener("mouseleave", () => {
    // Volver al color original cuando el cursor sale
    gsap.to(item, { backgroundColor: "", duration: 0.55 });
  });
});

// Animaciones con hover
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

// Parallax galería

gridItems.forEach((item) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 93%",
        end: "top 70%",
        scrub: true,
      },
    })
    .to(item, {
      height: "25vh", // Altura final
      ease: "none", // Movimiento directo, sin suavidad
    });
});

const gridItemHeadings = document.querySelectorAll(".grid-item h2");

gridItemHeadings.forEach((heading) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 93%",
        end: "top 70%",
        scrub: true,
      },
    })
    .to(heading, {
      fontSize: "2em", // Tamaño final de la letra
      ease: "none",
    });
});

// Parallax imagenes general

imagenes.forEach((item) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 99%",
        end: "top 50%",
        scrub: true,
      },
    })
    .to(item, {
      height: "100vh", // Altura final
      ease: "none",
    });
});
