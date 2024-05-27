let video;
let mobileNet;
let label = 'Klik op "Neem Foto" om een foto te maken';
let button;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    mobileNet = ml5.imageClassifier('MobileNet', video, modelLoaded);

    button = createButton('Neem Foto');
    button.mousePressed(takeSnapshot);
    updateButtonPosition();
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function takeSnapshot() {
    image(video, 0, 0, width, height);
    let base64Image = canvas.toDataURL('image/jpeg');
    mobileNet.classify(base64Image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        label = 'Herkend object: ' + results[0].label;
    }
}

function draw() {
    background(255);
    image(video, 0, 0, width, height);
    textSize(16);
    textAlign(LEFT);
    fill(255);
    text(label, 10, height - 10);
    updateButtonPosition();
}

function updateButtonPosition() {
    button.position((windowWidth - width) / 2 + width - button.width - 5, (windowHeight - height) / 2 + height - 5);
}
