const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'nl-BE';

let questionBtn = document.querySelector("#question");
let image = document.querySelector("img");
let checker = document.querySelector("#checker");

let questions = [
    {question: "Wat is beter, design of development", answer: "Development", imageSrc: "https://www.fovtysolutions.com/wp-content/uploads/2022/09/1_NhiqpOHe8jptZ4M95GkEMA.png"},
    {question: "Wat is de hoofdstad van Frankrijk", answer: "Parijs", imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYUEMtNrTM3oSUWFxYuU3qyQAztW24cZ30UJYYU2jymQ&s"},
    {question: "Wat is de hoofdstad van Duitsland", answer: "Berlijn", imageSrc: "https://s7g10.scene7.com/is/image/stena/20150820_berlin-brandenburg-gate:16-9?ts=1688733511559&dpr=off"},
    {question: "Wat voor vogel is dit", answer: "Zwaan", imageSrc: "https://www.foto4art.be/img/res/category/zwaan_5645.jpg"},
    {question: "Wat is de hoofdstad van Nederland", answer: "Amsterdam", imageSrc: "https://cms.finnair.com/resource/blob/691438/51db80b31ed1cdf10a5520699a8e673c/amsterdam-main-data.jpg?impolicy=crop&width=4000&height=1714&x=0&y=201"},
];
let currentQuestionIndex = -1; 

function askQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
    }
    let currentQuestion = questions[currentQuestionIndex];
    questionBtn.textContent = currentQuestion.question;
    image.src = currentQuestion.imageSrc;
    image.style.display = "block";

    let utterance = new SpeechSynthesisUtterance();
    utterance.text = currentQuestion.question;
    utterance.lang = "nl-BE";
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    synth.speak(utterance);
}

askQuestion(); 

recognition.onresult = function(event) {
    let answer = event.results[0][0].transcript.trim(); 
    let currentQuestion = questions[currentQuestionIndex];

    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        checker.textContent = "Correct! ✅";
        askQuestion(); 
    } else {
        checker.textContent = "Fout! ❌";
    }
};

document.querySelector("#speakBtn").addEventListener("click", () => {
    recognition.start();
});