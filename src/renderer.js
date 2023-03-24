// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const CLOSE_BTN = document.querySelector("#close-button");
const START_BTN = document.querySelector("#start-button");
const RELOAD_BTN = document.querySelector("#reload-button");
const BUTTON_WRAP = document.getElementById("button");
const TIME = document.getElementById("time");

var sec = 100;

var startFlag = true;
var studyFlag = true;

var timerStudy;

// close app
CLOSE_BTN.addEventListener("click", api.close);

START_BTN.addEventListener("click", () => {
    if (startFlag) {
        startTimer();
        START_BTN.innerHTML = "PAUSE";
    } else {
        stopTimer();
        START_BTN.innerHTML = "START";
    }
    startFlag = !startFlag;
});

RELOAD_BTN.addEventListener("click", () => {
    stopTimer();
    sec = 3000;
    redingSec();
    studyFlag = true;
    startFlag = true;
    TIME.classList.remove("refresh-time");
    TIME.classList.remove("left-1min");
    START_BTN.innerHTML = "START";
})

function startTimer() {
    timerStudy = setInterval(decreaseSec, 1000);
}

function stopTimer() {
    clearInterval(timerStudy);
}

function decreaseSec() {
    sec--;

    if (sec < 0) {
        if (studyFlag) {
            sec = 600;
            TIME.classList.add("refresh-time");
        } else {
            TIME.classList.remove("refresh-time");
            sec = 3000;
        }
        studyFlag = !studyFlag
        TIME.classList.remove("left-1min");
    } else if (sec < 60) {
        TIME.classList.add("left-1min");
    }

    redingSec();
}

function redingSec() {
    TIME.innerText = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

