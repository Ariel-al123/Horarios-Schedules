import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Corregir la ruta hacia el archivo teachers.json
const TEACHERS_PATH = path.join(__dirname, '../../../src/data/teachers.json');
const JSON_HEADERS = { 'Content-Type': 'application/json' };

// Función para validar si el nombre es válido
function validateName(name) {
  if (!name) {
    return new Response(JSON.stringify({ error: 'Nombre del maestro es requerido' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }
  return null;
}

// Función para leer o inicializar el archivo JSON
function readTeachersFile(filePath) {
  try {
    // Asegurarse de que el directorio exista
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(filePath)) {
      const teachersData = fs.readFileSync(filePath, 'UTF-8');
      // Si el archivo está vacío, inicializar con un array vacío
      if (teachersData.trim() === '') {
        return [];
      }
      return JSON.parse(teachersData);
    }
    
    // Si el archivo no existe, crear un archivo vacío con un array
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  } catch (error) {
    console.error('Error al leer o inicializar el archivo:', error);
    return [];
  }
}

// Función para guardar en el archivo JSON
function saveTeachersFile(filePath, teachers) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(teachers, null, 2));
    return true;
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    return false;
  }
}

// Función principal POST refactorizada
export async function post({ request }) {
  try {
    const body = await request.json();
    const { name, subjects } = body;

    // Imprime la ruta del archivo
    console.log('Ruta del archivo Teachers:', TEACHERS_PATH);

    const validationError = validateName(name);
    if (validationError) return validationError;

    // Leer los datos actuales
    const teachers = readTeachersFile(TEACHERS_PATH);
    
    // Crear nuevo profesor con ID único
    const newTeacher = { 
      id: Date.now().toString(),
      name,
      subjects: subjects || []
    };
    
    teachers.push(newTeacher);
    console.log('Datos a guardar:', teachers);

    // Guardar los cambios
    const success = saveTeachersFile(TEACHERS_PATH, teachers);
    
    if (!success) {
      return new Response(JSON.stringify({ error: 'Error al guardar el archivo' }), {
        status: 500,
        headers: JSON_HEADERS,
      });
    }

    // Verificar datos guardados
    const savedTeachers = readTeachersFile(TEACHERS_PATH);
    console.log('Datos en el archivo después de guardar:', savedTeachers);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Maestro guardado correctamente',
      teacher: newTeacher 
    }), {
      status: 200,
      headers: JSON_HEADERS,
    });
  } catch (error) {
    console.error('Error en el endpoint:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: JSON_HEADERS,
    });
  }
}