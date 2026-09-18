const student = {
    name: "Riya",
    age: 20,
    course: "Cloud Computing",
    city: "Hubli",
    subjects: ["Python", "DBMS", "IT Skills", "Computer Network"]
};

console.log(`Information of the Student :`)
console.log(student);
console.log(`Name of the Student : ${student.name}`);
console.log(`Course the student enrolled in : ${student.course}`);

console.log("To check the student weather adult or not")
if (student.age >= 18){
    console.log("Adult");
}else {
    console.log("Child");
}

console.log("The subject student currently learning ")

for (const subject of student.subjects){
    console.log(subject);
}

console.log("Does Student leaning Java ?");

console.log(student.subjects.includes("Java"));

console.log("Which number is DBMS subject is ?")

console.log(student.subjects.indexOf("DBMS"));

console.log("The list of Subject")

console.log(student.subjects.join(", "));

console.log("Get the 2nd and 3rd subject");

console.log(student.subjects.slice(1, 3));

function getCity(student){
    return student.city;
}

console.log(getCity(student));

