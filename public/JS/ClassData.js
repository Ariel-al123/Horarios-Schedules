export default class Data {
    Id;
    Name;
    Teacher;
    Group;
    Difficult;

    constructor(Id, Name, Teacher, Group, Difficult) {
        this.Id = Id;
        this.Name = Name;
        this.Teacher = Teacher;
        this.Group = Group;
        this.Difficult = Difficult;
    }

    MakeId(Name, Teacher){
        return `${this.Name}.${this.Teacher}`;
    }

    GetSubjects(){

    }

    SaveSubjects(){

    }

    GetTeacher(){

    }

    SaveTeacher(){

    }

    ClearJson(){

    }
}
