const ModelC = "https://teachablemachine.withgoogle.com/models/7fYc62ook/";
const gameRadio = document.getElementById('btnradio');
const video = document.getElementById('video');

let confidence1, confidence2, confidence3;

// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
  });

  const loop = classifier => {
    classifier.classify().then(results => {
        //format decimal into percentage
        confidence1 = results[0].confidence * 100;
        confidence2 = results[1].confidence * 100;
        confidence3 = results[2].confidence * 100;

        result1.innerText = results[0].label;
        probability1.innerText = confidence1.toFixed(2) + "%";

        result2.innerText = results[1].label;
        probability2.innerText = confidence2.toFixed(2) + "%";

        result3.innerText = results[2].label;
        probability3.innerText = confidence3.toFixed(2) + "%";

        loop(classifier); // Call again to create a loop
    });
  };

ml5.imageClassifier(ModelC, video).then(classifier => loop(classifier));

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