const ModelS = "https://teachablemachine.withgoogle.com/models/GPTeYQpBe/";
const ModelF = "https://teachablemachine.withgoogle.com/models/RYtb6W0xK/";
const video = document.getElementById('video');

let sPredict = document.getElementById('sPrediction');
let fPredict = document.getElementById('fPrediction');

// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});

ml5.imageClassifier(ModelF, video).then(classifier => fLoop(classifier));
ml5.imageClassifier(ModelS, video).then(classifier => sLoop(classifier));

const sLoop = classifier => {
  classifier.classify().then(results => {
    console.log(results);

      //inner prediction for Zebra, Pig, and Lion
      if(results[0].label === "Zebra") {
        sPredict.innerHTML = "🦓";
      }else if(results[0].label === "Rhino") {
        sPredict.innerHTML = "🦏";
      }else if(results[0].label === "Lion") {
        sPredict.innerHTML = "🦁";
      }else{
        sPredict.innerHTML = "❔";
      }

    sLoop(classifier); // Call again to create a loop
  });
};

const fLoop = classifier => {
  classifier.classify().then(results => {
    console.log(results);
      //Tiger, Horse, and Rhino
      if(results[0].label === "Tiger") {
        fPredict.innerHTML = "🐅";
      }else if(results[0].label === "Horse") {
        fPredict.innerHTML = "🐎";
      }else if(results[0].label === "Pig") {
        fPredict.innerHTML = "🐖";
      }else{
        fPredict.innerHTML = "❔";
      }
    fLoop(classifier); // Call again to create a loop
  });
};

