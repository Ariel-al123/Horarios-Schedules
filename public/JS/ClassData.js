import fs from "fs";
import path from "path";

// Ruta al archivo JSON

export default class Data {
  Id;
  NameSubject;
  Teacher;
  Group;
  Difficult;
  BtnSave;
  Form;

  constructor(Id, NameSubject, Teacher, Group, Difficult, BtnSave, Form) {
    this.Id = Id;
    this.NameSubject = NameSubject;
    this.Teacher = Teacher;
    this.Group = Group;
    this.Difficult = Difficult;
    this.BtnSave = BtnSave;
    this.Form = Form;
  }

  MakeId() {
    return `${this.NameSubject}.${this.Teacher}`;
  }

  // Funciones para guardar y obtener datos de Subjects

  GetSubjects() {}

  SaveSubjects() {}

  // Funciones para guardar y obtener datos de Teachers

  GetTeacher() {}



  VerificarArchivo(){
    const filePath = path.join(__dirname, '../../src/data', 'teachers.json');

    // Verificar permisos de escritura
    fs.access(filePath, fs.constants.W_OK, (err) => {
      if (err) {
        console.log('No tienes permisos de escritura en el archivo. Intentando otorgarlos...');
        
        // Intentar otorgar permisos de escritura (lectura y escritura para el usuario, grupo y otros)
        fs.chmod(filePath, 0o666, (chmodErr) => {
          if (chmodErr) {
            console.error('Error al cambiar los permisos:', chmodErr);
          } else {
            console.log('Permisos modificados correctamente. Ahora puedes escribir en el archivo.');
          }
        });
      } else {
        console.log('El archivo tiene permisos de escritura.');
      }
    });
  }

  SaveTeacher(Teacher) {
    // Se arma la ruta completa al archivo teachers.json
    const teachersFilePath = path.join(
      __dirname,
      "../../src/data",
      "teachers.json"
    );
    let teachersData = [];

    // Si el archivo existe, lo leemos y parseamos
    if (fs.existsSync(teachersFilePath)) {
      const data = fs.readFileSync(teachersFilePath, "UTF-8");
      try {
        teachersData = JSON.parse(data);
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
      }
    }

    // Creamos el objeto del nuevo maestro. Aquí puedes agregar más campos si es necesario.
    const newTeacher = {
      name: teacherName,
      subjects: "Matemáticas", // Puedes modificar o eliminar este campo según tus necesidades
    };

    // Se agrega el nuevo maestro al array
    teachersData.push(newTeacher);

    // Se escribe el nuevo array en el archivo JSON con una identación de 4 espacios
    fs.writeFileSync(
      teachersFilePath,
      JSON.stringify(teachersData, null, 4),
      "UTF-8"
    );
    console.log("Maestro guardado exitosamente.");
   // document.querySelector("#Archivo-Guardado").value = block;
  }

  ClearJson() {}
}
