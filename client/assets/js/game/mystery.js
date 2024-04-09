//const ModelM = "https://teachablemachine.withgoogle.com/models/7fYc62ook/";
const video = document.getElementById('video');

let mPredict = document.getElementById('fPrediction');

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

//ml5.imageClassifier(ModelM, video).then(classifier => mLoop(classifier));

