const ModelB = "https://teachablemachine.withgoogle.com/models/6VPwYD7kU/";
const gameRadio = document.getElementById('btnradio');
const video = document.getElementById('video');

let confidence;

// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
  });

  const loop = classifier => {
    classifier.classify().then(results => {
        //format decimal into percentage
        confidence = results[0].confidence * 100;

        result.innerText = results[0].label;
        probability.innerText = confidence.toFixed(2) + "%";
        loop(classifier); // Call again to create a loop
    });
  };

ml5.imageClassifier(ModelB, video).then(classifier => loop(classifier));

//Check Radio buttons for game
function gameCheck() {
    game = document.querySelector('input[name="btnradio"]:checked').value;

    if (game == '0') {
        location.replace("gameA.html");
    }
    if (game == '1') {
        location.replace("gameB.html");
    }
    if (game == '2') {
        location.replace("gameC.html");
    }
}