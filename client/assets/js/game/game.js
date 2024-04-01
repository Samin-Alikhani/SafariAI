const ModelA = "https://teachablemachine.withgoogle.com/models/W5TDNWZkL/";
const ModelB = "https://teachablemachine.withgoogle.com/models/6VPwYD7kU/";
const ModelC = "https://teachablemachine.withgoogle.com/models/7fYc62ook/";

let model;

const video = document.getElementById('video');

// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
  });

  const loop = classifier => {
    classifier.classify().then(results => {
      result.innerText = results[0].label;
      probability.innerText = results[0].confidence.toFixed(4);
      loop(classifier); // Call again to create a loop
    });
  };

  function gameCheck() {
    game = document.querySelector('input[name="btnradio"]:checked').value;

    if (game == '0') {
        ml5.imageClassifier(ModelA, video).then(classifier => loop(classifier));
    }
    else if (game == '1') {
        ml5.imageClassifier(ModelB, video).then(classifier => loop(classifier));
    }
    else {
        ml5.imageClassifier(ModelC, video).then(classifier => loop(classifier));
    }
}

