const URL = "https://teachablemachine.withgoogle.com/models/kNZOxCcsh/";
//function to display webcam
function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    var video = document.getElementById('webcam');
 
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function (err) {
        console.log("An error occurred: " + err);
    });

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}