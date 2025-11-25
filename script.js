const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");

const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let time = 60;
let timer = null;
let started = false;

const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast requires practice and consistency.",
    "Your typing speed improves when you stay focused.",
    "Coding every day makes you better at problem solving.",
];

let selectedText = "";

startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", restartTest);

function startTest() {
    selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textEl.textContent = selectedText;

    inputEl.disabled = false;
    inputEl.value = "";
    inputEl.focus();

    time = 60;
    timeEl.textContent = time;

    started = true;

    if (timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (time > 0) {
        time--;
        timeEl.textContent = time;

        if (time === 0) finishTest();
    }
}

function finishTest() {
    clearInterval(timer);
    inputEl.disabled = true;
    started = false;

    const typedText = inputEl.value;
    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === selectedText[i]) correct++;
    }

    let accuracy = Math.round((correct / typedText.length) * 100) || 0;

    let words = typedText.trim().split(" ").length;
    let wpm = Math.round(words);

    wpmEl.textContent = wpm;
    accuracyEl.textContent = accuracy;
}

function restartTest() {
    clearInterval(timer);
    time = 60;
    started = false;

    textEl.textContent = "";
    inputEl.value = "";
    inputEl.disabled = true;

    timeEl.textContent = 60;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 0;
}
