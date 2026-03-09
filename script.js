document.addEventListener("DOMContentLoaded", () => {
  // On vérifie si l'écran est plus large que 768px (donc un ordinateur)
  if (window.matchMedia("(min-width: 769px)").matches) {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // Vérification de sécurité (au cas où les éléments n'existent pas)
    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Cacher le curseur par défaut du navigateur
    document.body.style.cursor = "none";
    document.querySelectorAll("a, button, input, textarea").forEach((el) => {
      el.style.cursor = "none";
    });

    // Mettre à jour la position de la souris
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Le point suit instantanément
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";

      // S'assurer que les éléments sont visibles au mouvement
      cursorDot.style.opacity = 1;
      cursorOutline.style.opacity = 1;
    });

    // Animation fluide du cercle (trainée)
    function animate() {
      let distX = mouseX - outlineX;
      let distY = mouseY - outlineY;

      outlineX += distX * 0.15; // Vitesse du suivi (0.15 est fluide)
      outlineY += distY * 0.15;

      cursorOutline.style.left = outlineX + "px";
      cursorOutline.style.top = outlineY + "px";

      requestAnimationFrame(animate);
    }
    animate();

    // Gestion des effets au survol des liens et boutons
    const hoverElements = document.querySelectorAll(
      "a, button, .nav-link, .social-link, .skill-card"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(2)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.8)";
        cursorOutline.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      });

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
      });
    });

    // Masquer le curseur quand la souris quitte la fenêtre
    document.addEventListener("mouseout", () => {
      cursorDot.style.opacity = 0;
      cursorOutline.style.opacity = 0;
    });
  }
});
