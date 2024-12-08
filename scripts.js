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
      ease: "power1.inOut",
    });
  } else {
    // Rota el elemento 90 grados
    gsap.to(menuIcon, {
      rotation: 90,
      duration: 0.3,
      ease: "power1.inOut",
    });
  }
  isRotated = !isRotated; // Alterna el estado de la rotación
});

//MUÑECO QUE APARECE

// Función para manejar el desplazamiento y mostrar/ocultar el elemento
window.addEventListener("scroll", () => {
  const placeholder = document.querySelector(".placeholder");
  const scrollPosition = window.scrollY;

  // Verificar si el desplazamiento está dentro del rango
  if (scrollPosition >= 1000 && scrollPosition <= 2600) {
    placeholder.style.transition = "transform 2s ease-in-out";
    placeholder.style.transform = "translate(70%, -50%)"; // Mueve al centro de la pantalla
  } else {
    placeholder.style.transition = "transform 2s ease-in-out";
    placeholder.style.transform = "translate(120%, -50%)"; // Mueve al centro de la pantalla
  }
});

//ENTRADA TEXTO 1
// Animación de entrada de texto

gsap.registerPlugin(ScrollTrigger);

// Primera animación: Entrada y salida de spans
const spans = document.querySelectorAll(".span-giratorio");

spans.forEach((span) => {
  gsap.fromTo(
    span,
    { x: -200, opacity: 0 }, // Fuera de la pantalla
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: span,
        start: "top 90%", // Entra al 90% de la pantalla
        end: "top 10%", // Sale al 10%
        toggleActions: "play reverse play reverse", // Animación en ambas direcciones
      },
    }
  );
});

// Segunda animación: Interacción con hover o tap
const interactiveDivs = document.querySelectorAll(".interactive-div");

interactiveDivs.forEach((div) => {
  const span = div.querySelector(".span-giratorio");
  const description = div.querySelector(".descripcion-1");
  // Animación de hover (para dispositivos de escritorio)
  div.addEventListener("mouseenter", () => {
    // Rotar el div
    gsap.to(div, {
      rotation: -90,
      duration: 0.3,
      ease: "power1.inOut",
    });

    // Mostrar la descripción
    gsap.to(description, {
      rotation: 90,
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power1.out",
      pointerEvents: "all", // Permite interacción
    });
  });

  // Animación de salir del hover (para dispositivos de escritorio)
  div.addEventListener("mouseleave", () => {
    // Revertir la rotación del div
    gsap.to(div, {
      rotation: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });

    // Ocultar la descripción
    gsap.to(description, {
      opacity: 0,
      y: 0,
      duration: 0.3,
      ease: "power1.in",
      pointerEvents: "none", // Desactiva interacción
    });
  });

  // Animación de tap (para dispositivos móviles)
  div.addEventListener("touchstart", () => {
    // Rotar el div al tocarlo
    gsap.to(div, {
      rotation: -90,
      duration: 0.3,
      ease: "power1.inOut",
    });

    // Mostrar la descripción
    gsap.to(description, {
      rotation: 90,
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power1.out",
      pointerEvents: "all", // Permite interacción
    });
  });

  // Animación de soltar el tap (para dispositivos móviles)
  div.addEventListener("touchend", () => {
    // Revertir la rotación del div al soltar el tap
    gsap.to(div, {
      rotation: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });

    // Ocultar la descripción
    gsap.to(description, {
      opacity: 0,
      y: 0,
      duration: 0.3,
      ease: "power1.in",
      pointerEvents: "none", // Desactiva interacción
    });
  });
});
