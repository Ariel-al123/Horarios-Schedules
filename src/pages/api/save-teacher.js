import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEACHERS_PATH = path.join(__dirname, '../../src/data/teachers.json');
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
  if (fs.existsSync(filePath)) {
    const teachersData = fs.readFileSync(filePath, 'UTF-8');
    return JSON.parse(teachersData);
  }
  return [];
}

// Función para guardar en el archivo JSON
function saveTeachersFile(filePath, teachers) {
  fs.writeFileSync(filePath, JSON.stringify(teachers, null, 2));
}

// Función principal POST refactorizada
export async function post({ request }) {
  const { name } = await request.json();

  // Imprime la ruta del archivo
  console.log('Ruta del archivo Teachers:', TEACHERS_PATH);

  const validationError = validateName(name);
  if (validationError) return validationError;

  const teachers = readTeachersFile(TEACHERS_PATH);
  const newTeacher = { name };
  teachers.push(newTeacher);

  console.log('Datos a guardar:', teachers); // Verifica los datos que serán guardados

  saveTeachersFile(TEACHERS_PATH, teachers);

  // Verifica los datos guardados al leer el archivo nuevamente
  const savedTeachers = readTeachersFile(TEACHERS_PATH);
  console.log('Datos en el archivo después de guardar:', savedTeachers);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: JSON_HEADERS,
  });
}

// Ejemplo de uso para garantizar que la función 'post' se utiliza
if (import.meta.url === `file://${process.argv[1]}`) {
  const mockRequest = {
    json: async () => ({ name: 'New Teacher' }),
  };
  post({ request: mockRequest }).then(console.log);
}