//Importar la clase ClassData
import Data from "../../public/JS/ClassData.js";

//Declaracion de variables
var Name = "Matematicas";
var Teacher = "Juan Perez";

//Instancia de la clase ClassData y llamado de la funcion MakeId
let ClassData= new Data(null, Name, Teacher, "A1", "Hard");

console.log(ClassData.MakeId(Name, Teacher));



