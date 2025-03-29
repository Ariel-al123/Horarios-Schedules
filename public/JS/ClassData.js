import fs from "fs";
import path from "path";

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

   MakeId(NameSubject, Teacher) {
    return `${NameSubject}.${Teacher}`;
  }

  // Funciones para guardar y obtener datos de Subjects

  GetSubjects() {}

  SaveSubjects() {}

  // Funciones para guardar y obtener datos de Teachers

  GetTeacher() {}

  SaveTeacher(Teacher, NameSubject) {
    //Creamos un Id de la materia
    const Id_Subject = this.MakeId(NameSubject, Teacher);

    // Creamos el objeto del nuevo maestro.
    const DataTeacher = {
      Name: Teacher,
      Subjects: NameSubject
    };

    // Se agrega el nuevo maestro local storage
    localStorage.setItem(Id_Subject, JSON.stringify(DataTeacher));
  }

  ClearJson() {}
}
