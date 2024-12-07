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

const spans = document.querySelectorAll(".content span");

spans.forEach((span) => {
  gsap.fromTo(
    span,
    { x: -200, opacity: 0 }, // Estado inicial (fuera de pantalla)
    {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: span,
        start: "top 99%", // Empieza a animarse al entrar al viewport
        end: "top 1%", // Considerado fuera del viewport cuando la parte superior del span está cerca de salir
        onEnter: () =>
          gsap.fromTo(
            span,
            { x: -200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }
          ),
        onLeave: () => gsap.set(span, { x: -200, opacity: 0 }), // Se esconde al salir
      },
    }
  );

  // Funcionalidad de rotación al hacer hover o tap
  span.addEventListener("mouseenter", () => {
    gsap.to(span, {
      rotation: -90,
      duration: 0.3,
      ease: "power1.inOut",
    });
  });

  span.addEventListener("mouseleave", () => {
    gsap.to(span, {
      rotation: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  });

  // Para dispositivos móviles, usar touchstart para detectar el tap
  span.addEventListener("touchstart", () => {
    gsap.to(span, {
      rotation: -90,
      duration: 0.3,
      ease: "power1.inOut",
    });
  });

  span.addEventListener("touchend", () => {
    gsap.to(span, {
      rotation: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  });
});
