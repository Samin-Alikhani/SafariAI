function Student(firstName, lastLetter, gradeLevel) {
    this.firstName = firstName;
    this.lastLetter = lastLetter;
    this.gradeLevel = gradeLevel;
}

function getStudentInfo() {
    let userFirstName = document.getElementById("firstName").value;
    let userLastLetter = document.getElementById("lastLetter").value;
    let userGradeLevel = document.querySelector('input[name="gradeLevel"]:checked').value;
    let user = new Student(userFirstName, userLastLetter, userGradeLevel);
    console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    location.replace("rules.html");
}