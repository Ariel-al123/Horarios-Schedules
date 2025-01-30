document.addEventListener("DOMContentLoaded", () => {
  // Verifica que el DOM esté listo
  console.log("DOM cargado");

  // Obtener elementos del DOM
  const plusIcon = document.querySelector(".Plus");
  const menu = document.querySelector(".contenedor-plus-menu");

  // Verificar que los elementos existan
  if (!plusIcon || !menu) {
    console.error(
      "No se encontraron los elementos Plus o contenedor-plus-menu."
    );
    return;
  }

  // Alternar visibilidad del menú al hacer clic
  plusIcon.addEventListener("click", (event) => {
    // Evitar propagación del evento
    event.stopPropagation();
    // Verifica que el evento se esté ejecutando
    console.log("Click en Plus Icon");
    // Mostrar/ocultar el menú
    menu.classList.toggle("active");
  });

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener("click", (event) => {
    if (menu.contains(event.target) && plusIcon.contains(event.target)) {
      // Verifica que el evento se esté ejecutando
      console.log("Clic fuera del menú");
      // Ocultar el menú
      menu.classList.remove("active");
    }
  });

  // Mostrar el menú al hacer hover
  plusIcon.addEventListener("mouseenter", () => {
    // Verifica que el evento se esté ejecutando
    console.log("Mouse enter en Plus Icon");
    // Mostrar el menú
    menu.classList.add("active");
  });
  // Ocultar el menú si se mueve el mouse fuera del menú
  menu.addEventListener("mouseleave", () => {
    // Verifica que el evento se esté ejecutando
    console.log("Mouse leave en el menú");
    // Ocultar el menú
    menu.classList.remove("active");
  });
});
