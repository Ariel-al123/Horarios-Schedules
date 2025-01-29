import Data from "./ClassData.js"; // Ruta correcta al archivo Js

var Name = "Matematicas";
var Teacher = "Juan Perez";

let ClassData= new Data(null, Name, Teacher, "A1", "Hard");

console.log(ClassData.MakeId(Name, Teacher)); // Matematicas.Juan Perez



