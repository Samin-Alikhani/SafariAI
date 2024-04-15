//const ModelM = "https://teachablemachine.withgoogle.com/models/7fYc62ook/";
const video = document.getElementById('video');
const score = document.getElementById('score');
let mPredict = document.getElementById('fPrediction');

//ml5.imageClassifier(ModelM, video).then(classifier => mLoop(classifier));

// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
  });

  
const mLoop = classifier => {
  classifier.classify().then(results => {

    //Tiger, Horse, and Rhino
    if(results[0].label === "Tiger") {
        mPredict.innerHTML = "🐅";
    }else if(results[0].label === "Horse") {
        mPredict.innerHTML = "🐎";
    }else if(results[0].label === "Rhino") {
        mPredict.innerHTML = "🦏";
    }

    mLoop(classifier); // Call again to create a loop
  });
};

document.getElementById('sButton').addEventListener('click', function() {
    var checkboxes = document.querySelectorAll('.form-check-input');
    var score = 0;
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            score += parseInt(checkbox.value);
        }
    });

    // if score is less than 0, set it to 0
    if (score < 0) {
        score = 0;
    }

    // Display the score
    document.getElementById('score').innerHTML = score;

    // Display a message based on the score and append it to the score
    if (score >= 3){
        document.getElementById('score').innerHTML += " - You got them all right!";
    }

    // Store the score in session storage
    sessionStorage.setItem('quizScore', score);
});