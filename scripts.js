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
const spans = document.querySelectorAll(".h2-animado-1");

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


// Selección de elementos interactivos
const interactiveDivs = document.querySelectorAll(".interactive-div");

// Configura el Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const div = entry.target;
      const span = div.querySelector(".h2-animado-1");
      const description = div.querySelector(".descripcion-1");
      const textoGrande = document.querySelector(".texto-grande-r"); // Selecciona el <p>

      // Cuando el elemento está dentro del viewport
      if (entry.isIntersecting) {
        // No hacemos nada hasta que ocurra una interacción
      } else {
        // Cuando el elemento sale del viewport, reinicia animaciones
        gsap.set(div, { clearProps: "all" }); // Reinicia propiedades del div
        gsap.set(description, { clearProps: "all" }); // Reinicia propiedades de la descripción
        gsap.set(textoGrande, { clearProps: "all" }); // Reinicia propiedades del <p>
      }
    });
  },
  {
    threshold: 0, // Se activa cuando el 10% del elemento es visible
  }
);

// Observa cada elemento
interactiveDivs.forEach((div) => observer.observe(div));


// Animaciones de hover y clic

interactiveDivs.forEach((div) => {
  const span = div.querySelector(".h2-animado-1");
  const description = div.querySelector(".descripcion-1");
  const textoGrande = document.querySelector(".texto-grande-r"); // Selecciona el <p>

  // Estado para alternar animaciones
  let isUp = false;

  // Animación de hover (para dispositivos de escritorio)
  div.addEventListener("mouseenter", () => {
    if (!isUp) {
      // Animación del div y descripción
      gsap.to(div, {
        duration: 0.3,
        ease: "power1.inOut",
        y: -80,
      });

      gsap.to(description, {
        opacity: 1,
        y: 30,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Animación del <p>
      gsap.to(textoGrande, {
        opacity: 1,
        y: -80,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  });

  // Animación de salir del hover (para dispositivos de escritorio)
  div.addEventListener("mouseleave", () => {
    if (!isUp) {
      // Revertir animación del div y descripción
      gsap.to(div, {
        y: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });

      gsap.to(description, {
        opacity: 0,
        y: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Revertir animación del <p>
      gsap.to(textoGrande, {
        opacity: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  });

  // Animación de clic/tap (funciona en escritorio y móviles)
  div.addEventListener("click", () => {
    if (!isUp) {
      // Animación al hacer clic
      gsap.to(div, {
        y: -80,
        duration: 0.3,
        ease: "power1.inOut",
      });

      gsap.to(description, {
        opacity: 1,
        y: 30,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Animación del <p>
      gsap.to(textoGrande, {
        opacity: 1,
        y: -80,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // Revertir animación al hacer clic de nuevo
      gsap.to(div, {
        y: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });

      gsap.to(description, {
        opacity: 0,
        y: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Revertir animación del <p>
      gsap.to(textoGrande, {
        opacity: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    // Alternar estado
    isUp = !isUp;
  });
});


// IMAGENES GALERÍA ANIMACIÓN INFINITA
// Animación flotante para los grid-items

// Seleccionar todos los grid-items
const gridItems = document.querySelectorAll(".grid-item");

// Seleccionar las imágenes y los grid-items
const gridImages = document.querySelectorAll(".grid-item img");

// Agregar animaciones al hover
gridItems.forEach((item) => {
  const h2 = item.querySelector("h2");

  item.addEventListener("mouseenter", () => {
    // Animar la opacidad y posición del texto
    gsap.to(h2, {
      opacity: 0.85,
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