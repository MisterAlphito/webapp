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
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: span,
        start: "top 105%",
        end: "top -10%",
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

  // Estado para alternar animaciones
  let isUp = false;

  // Animación de hover (para dispositivos de escritorio)
  div.addEventListener("mouseenter", () => {
    if (!isUp) {
      gsap.to(div, {
        duration: 0.3,
        ease: "power1.inOut",
        y: -80,
      });

      gsap.to(description, {
        opacity: 1,
        y: 30,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  });

  // Animación de salir del hover (para dispositivos de escritorio)
  div.addEventListener("mouseleave", () => {
    if (!isUp) {
      gsap.to(div, {
        y: origin,
        duration: 0.3,
        ease: "power1.inOut",
      });

      gsap.to(description, {
        opacity: 0,
        y: origin,
        duration: 0.3,
        ease: "power1.in",
      });
    }
  });

  // Animación de tap (para dispositivos móviles)
  div.addEventListener("touchstart", () => {
    if (!isUp) {
      // Rotar el div al tocarlo
      gsap.to(div, {
        y: -80,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Mostrar la descripción
      gsap.to(description, {
        opacity: 1,
        y: 20,
        duration: 0.3,
        ease: "power1.out",
      });
    } else {
      // Revertir la rotación del div al soltar el tap
      gsap.to(div, {
        y: origin,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Ocultar la descripción
      gsap.to(description, {
        opacity: 0,
        y: origin,
        duration: 0.3,
        ease: "power1.in",
      });
    }

    // Alternar estado
    isUp = !isUp;
  });

  // Animación de soltar el tap (no necesaria en este caso)
});

// IMAGENES GALERÍA ANIMACIÓN INFINITA
// Animación flotante para los grid-items

// Seleccionar todos los grid-items
const gridItems = document.querySelectorAll(".grid-item");

// Función para generar un movimiento aleatorio
function randomMovement(target) {
  gsap.to(target, {
    x: () => Math.random() * 50 - 25, // Mueve de -15px a 15px en el eje X
    y: () => Math.random() * 50 - 25, // Mueve de -15px a 15px en el eje Y
    duration: () => Math.random() * 4 + 2.5, // Duración aleatoria
    ease: "power1.inOut", // Suaviza la animación
    repeat: -1, // Repite infinitamente
    yoyo: true, // Vuelve al estado inicial
  });
}

// Aplicar la animación a cada grid-item
gridItems.forEach((item) => {
  randomMovement(item);
});

// Registro del plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Seleccionar las imágenes y los grid-items
const gridImages = document.querySelectorAll(".grid-item img");

// Animación para los .grid-item
gridItems.forEach((item) => {
  // Inicializar opacidad y box-shadow
  gsap.set(item, {
    opacity: 0,
  });

  // Animar .grid-item al entrar en el viewport
  gsap.to(item, {
    opacity: 1,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: item, // Disparador es el grid-item
      start: "top 110%", // Comienza al entrar al viewport
      end: "top -12%", // Termina cerca del final
      toggleActions: "play reverse play reverse",
    },
  });
});

// Animación para las imágenes
gridImages.forEach((img) => {
  // Inicializar la posición de las imágenes
  gsap.set(img, {
    opacity: 0,
    y: 50,
  });

  // Animar imágenes al entrar en el viewport
  gsap.to(img, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: img,
      start: "top 110%",
      end: "top -12%",
      toggleActions: "play reverse play reverse",
    },
  });
});

// Seleccionar todos los elementos .grid-item

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

