const inputText = document.getElementById('inputText');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');

let words = [];
let interval = null;
let currentIndex = 0;
let wpm = parseInt(speedSlider.value, 10);

speedSlider.addEventListener('input', () => {
    wpm = parseInt(speedSlider.value, 10);
    speedValue.textContent = wpm;
    // If reading is in progress, update speed immediately
    if (interval) {
        clearInterval(interval);
        startReading(true);
    }
});

function stopReading() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    startBtn.disabled = false;
}

function startReading(resume = false) {
    if (!resume) {
        const text = inputText.value.trim();
        if (!text) {
            display.textContent = '';
            return;
        }
        words = text.split(/\s+/);
        currentIndex = 0;
    }
    startBtn.disabled = true;
    display.textContent = '';
    const intervalMs = 60000 / wpm;
    interval = setInterval(() => {
        if (currentIndex >= words.length) {
            stopReading();
            return;
        }
        display.textContent = words[currentIndex];
        currentIndex++;
    }, intervalMs);
}

startBtn.addEventListener('click', () => {
    stopReading();
    startReading();
});
