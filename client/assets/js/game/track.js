//tracker to see how long the player has been playing

var trackTime = {
    totalTime: 0,
    gameTotalTime: 0,
    quizTotalTime: 0,
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
    },
    gameStart: function() {
        // Store the start time in session storage
        sessionStorage.setItem('gameStartTime', new Date().getTime());
        console.log("Game started at: " + new Date());
    },
    gameEnd: function() {
        // Retrieve the start time from session storage
        var gameStartTime = parseInt(sessionStorage.getItem('gameStartTime'));
        if (!isNaN(gameStartTime)) {
            var gameEndTime = new Date().getTime();
            this.gameTotalTime += gameEndTime - gameStartTime;
            console.log("Game ended at: " + new Date(gameEndTime));
            //display the total time in the console in seconds
            console.log("Total time: " + this.gameTotalTime / 1000 + " seconds");
            // Optionally, you can clear the start time from session storage
            sessionStorage.removeItem('gameStartTime');
            sessionStorage.setItem('gameTotalTime', this.gameTotalTime);
        } else {
            console.log("No game started.");
        }
    },
    quizStart: function() {
        // Store the start time in session storage
        sessionStorage.setItem('quizStartTime', new Date().getTime());
        console.log("Quiz started at: " + new Date());
    },
    quizEnd: function() {
        // Retrieve the start time from session storage
        var quizStartTime = parseInt(sessionStorage.getItem('quizStartTime'));
        if (!isNaN(quizStartTime)) {
            var quizEndTime = new Date().getTime();
            this.quizTotalTime += quizEndTime - quizStartTime;
            console.log("Quiz ended at: " + new Date(quizEndTime));
            //display the total time in the console in seconds
            console.log("Total time: " + this.quizTotalTime / 1000 + " seconds");
            // Optionally, you can clear the start time from session storage
            sessionStorage.removeItem('quizStartTime');
            sessionStorage.setItem('quizTotalTime', this.quizTotalTime);
        } else {
            console.log("No quiz started.");
        }
    }
};

function Student(firstName, lastName, gradeLevel) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gradeLevel = gradeLevel;
}

function Time(totalTime, gameTotalTime, quizTotalTime) {
    //total time spent on the website in seconds
    this.totalTime = totalTime / 1000;
    this.gameTotalTime = gameTotalTime / 1000;
    this.quizTotalTime = quizTotalTime / 1000;
}

function gatherStudentInfo() {
    let userFirstName = document.getElementById("firstName").value;
    let userLastName = document.getElementById("lastName").value;
    let userGradeLevel = document.querySelector('input[name="gradeLevel"]:checked').value;
    let user = new Student(userFirstName, userLastName, userGradeLevel);
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
    let totalTime = sessionStorage.getItem('totalTime');
    let gameTotalTime = sessionStorage.getItem('gameTotalTime');
    let quizTotalTime = sessionStorage.getItem('quizTotalTime');

    let time = new Time(totalTime, gameTotalTime, quizTotalTime);

    let data = {
        studentInfo: user,
        timeInfo: time,
        quizScore: sessionStorage.getItem('quizScore') 
    };
    
    // Generate filename based on student's first name and last initial
    let filename = user.lastName[0].toLowerCase() + "_" + user.firstName.toLowerCase() + ".json";

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
    trackTime.start();
}

function endTimer() {
    trackTime.end();
}

function startGame(){
    trackTime.gameStart();
};

function endGame(){
    trackTime.gameEnd();
}

function startQuiz(){
    trackTime.quizStart();
};

function endQuiz(){
    trackTime.quizEnd();
}