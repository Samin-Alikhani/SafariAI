//tracker to see how long the player has been playing

var track = {
    totalTime: 0,
    start: function() {
        // Store the start time in session storage
        sessionStorage.setItem('startTime', new Date().getTime());
        console.log("Activity started at: " + new Date());
    },
    end: function() {
        // Retrieve the start time from session storage
        var startTime = parseInt(sessionStorage.getItem('startTime'));
        if (!isNaN(startTime)) {
            var endTime = new Date().getTime();
            this.totalTime += endTime - startTime;
            console.log("Activity ended at: " + new Date(endTime));
            //display the total time in the console in seconds
            console.log("Total time: " + this.totalTime / 1000 + " seconds");
            // Optionally, you can clear the start time from session storage
            sessionStorage.removeItem('startTime');
            sessionStorage.setItem('totalTime', this.totalTime);
        } else {
            console.log("No activity started.");
        }
    }
};

function Student(firstName, lastLetter, gradeLevel) {
    this.firstName = firstName;
    this.lastLetter = lastLetter;
    this.gradeLevel = gradeLevel;
}

function gatherStudentInfo() {
    let userFirstName = document.getElementById("firstName").value;
    let userLastLetter = document.getElementById("lastName").value;
    let userGradeLevel = document.querySelector('input[name="gradeLevel"]:checked').value;
    let user = new Student(userFirstName, userLastLetter, userGradeLevel);
    console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user));
}

//function to display the student info
function displayStudentInfo() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        console.log(user);
    }
}

function exportData() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let data = {
        studentInfo: user,
        totalTime: track.totalTime / 1000 // Convert totalTime to seconds
    };
    
    // Generate filename based on student's first name and last initial
    let filename = user.firstName.toLowerCase() + "_" + user.lastLetter.toLowerCase() + ".json";

    // Convert data to JSON format
    let jsonData = JSON.stringify(data, null, 2);

    // Create a Blob containing the JSON data
    let blob = new Blob([jsonData], { type: "application/json" });

    // Create a link element
    let link = document.createElement("a");

    // Set link attributes
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
}

function startTimer() {
    track.start();
}

function endTimer() {
    track.end();
}