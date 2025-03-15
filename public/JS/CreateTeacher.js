import Data from "../JS/ClassData.js";
import path from "path";

// Inicialización de la clase Data (si es necesaria)
let ClassData = new Data(
  null,
  null,
  "#NameTeacher",
  null,
  null,
  "#BtnSave",
  "#Form"
);

// Selección de elementos del DOM
const form = document.querySelector("#Form"); // Corregido: Definir la variable 'form'
const input = document.querySelector("#NameTeacher");
const button = document.querySelector("#BtnSave");

// Función para actualizar el estado del botón
const ActualizarBoton = () => {
  button.disabled = input.value.trim() === "";
};


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const teacherName = input.value.trim();

  if (teacherName) {
    try {
      const response = await fetch('../../src/pages/api/save-teacher.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: teacherName,
          subjects: 'Matemáticas',
         }),
      });

      if (response.ok) {
        console.log('Maestro guardado exitosamente');
        input.value = ''; // Limpiar el campo
      } else {
        console.error('Error al guardar el maestro');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('Por favor ingresa un nombre');
  }
});

// Ejecutar la función al cargar la página para asegurar que el botón inicie deshabilitado
ActualizarBoton();

// Evento para actualizar el botón cuando el valor del input cambia
input.addEventListener("input", ActualizarBoton);