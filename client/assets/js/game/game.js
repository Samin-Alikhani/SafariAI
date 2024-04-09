const ModelS = "https://teachablemachine.withgoogle.com/models/7fYc62ook/";
const ModelF = "https://teachablemachine.withgoogle.com/models/6VPwYD7kU/";
const video = document.getElementById('video');

let fToggle = document.getElementById('fButton');
let sToggle = document.getElementById('sButton');

let sPredict = document.getElementById('sPrediction');
let fPredict = document.getElementById('fPrediction');

fToggle.addEventListener('click', function() {
  // Check if the button is pressed
  if(fToggle.getAttribute('aria-pressed') === 'true') {
      fToggle.innerHTML = 'On';
  } else {
      // Button is not pressed
      fToggle.innerHTML = 'Off';
  }
});

sToggle.addEventListener('click', function() {
  // Check if the button is pressed
  if(sToggle.getAttribute('aria-pressed') === 'true') {
      sToggle.innerHTML = 'On';
  } else {
      // Button is not pressed
      sToggle.innerHTML = 'Off';
  }
});

// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
  });

const sLoop = classifier => {
  classifier.classify().then(results => {
    console.log(results);
    if(sToggle.getAttribute('aria-pressed') === 'true') {
      //inner prediction for Zebra, Pig, and Lion
      if(results[0].label === "Zebra") {
        sPredict.innerHTML = "🦓";
      }else if(results[0].label === "Pig") {
        sPredict.innerHTML = "🐷";
      }else if(results[0].label === "Lion") {
        sPredict.innerHTML = "🦁";
      }else{
        sPredict.innerHTML = "❔";
      }

    }else{
      sPredict.innerHTML = "❔";
    }
    sLoop(classifier); // Call again to create a loop
  });
};

const fLoop = classifier => {
  classifier.classify().then(results => {
    if(fToggle.getAttribute('aria-pressed') === 'true') {
      //Tiger, Horse, and Rhino
      if(results[0].label === "Tiger") {
        fPredict.innerHTML = "🐅";
      }else if(results[0].label === "Horse") {
        fPredict.innerHTML = "🐎";
      }else if(results[0].label === "Rhino") {
        fPredict.innerHTML = "🦏";
      }else{
        fPredict.innerHTML = "❔";
      }
    }else{
      fPredict.innerHTML = "❔";
    }
    fLoop(classifier); // Call again to create a loop
  });
};

ml5.imageClassifier(ModelF, video).then(classifier => fLoop(classifier));
ml5.imageClassifier(ModelS, video).then(classifier => sLoop(classifier));

