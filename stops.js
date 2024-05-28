// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    
    display.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    displayTime(elapsedTime);
    startStopBtn.textContent = 'Start';
    laps = [];
    renderLaps();
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        laps.push(elapsedTime);
        renderLaps();
    }
});

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${index + 1}: ${String(Math.floor((lap / (1000 * 60)) % 60)).padStart(2, '0')}:${String(Math.floor((lap / 1000) % 60)).padStart(2, '0')}:${String(Math.floor((lap % 1000) / 10)).padStart(2, '0')}`;
        lapsList.appendChild(lapElement);
    });
}
