import Data from "../JS/ClassData.js";

// Inicialización de la clase Data (si es necesaria)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#Form");
  const input = document.querySelector("#NameTeacher");
  const button = document.querySelector("#BtnSave");

  const successMessage = document.querySelector(".Archivo-Guardado");
  const errorMessage = document.querySelector(".Archivo-No-Guardado");
  const materia = "Ingles";

  let ClassData = new Data(
    null,
    materia,
    input,
    null,
    null,
    button,
    null
  );

  // Función para actualizar el estado del botón
  const ActualizarBoton = () => {
    button.disabled = input.value.trim() === "";
  };

  // Ejecutar la función al cargar la página para asegurar que el botón inicie deshabilitado
  ActualizarBoton();

  // Evento para actualizar el botón cuando el valor del input cambia
  input.addEventListener("input", ActualizarBoton);

  // Función para guardar y mostrar mensajes
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await ClassData.SaveTeacher(input.value, materia);
      setTimeout(() => {
        successMessage.style.display = "block";
      }, 200); // Muestra el mensaje 
      console.log("Se guardó");
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 1300); // Ocultar el mensaje
    } catch (error) {
      setTimeout(() => {
        errorMessage.style.display = "block";
      }, 200);
      console.log("No se guardó");
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 1300); // Ocultar el mensaje
    }

    e.target.reset();
    ActualizarBoton(); // Asegurar que el botón se deshabilite después de enviar el formulario
  });
});
