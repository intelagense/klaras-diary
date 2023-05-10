const slider = document.getElementById("myRange");
const decode = document.getElementById("decode");
const sliderModalElement = document.getElementById("sliderModalElement")
const closeButton = document.querySelector(".close")
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", toggleIt);
decode.addEventListener("click", decodeDialog);
closeButton.addEventListener("click", decodeDialogClose);
sliderModalElement.addEventListener("click", e => {
    if (e.target.matches('#sliderModalElement')) {
        sliderModalElement.open = false
    }
})

function toggleIt() {
    if (document.documentElement.dataset.theme === "dark") {
        document.documentElement.dataset.theme = "light";
        themeToggle.classList.remove = "theme-toggle--toggled"; //fix this
    } else {
        document.documentElement.dataset.theme = "dark";
        themeToggle.classList.add = "theme-toggle--toggled"; //fix this
    }
}

function decodeDialog() {
    sliderModalElement.open = true
}

function decodeDialogClose() {
    sliderModalElement.open = false
}


// document.querySelector("#text").innerText = SeededShuffle.unshuffle(alice, 1, true).join(" ");

// slider.oninput = function () {
//     document.querySelector("#text").innerText = SeededShuffle.unshuffle(alice, this.value, true).join(" ");
// }
//////////// Countdown Timer

// start with the 24 hr
// get the stored time,
// add 24 hours to the stored time
// get the current time,
// calculate the difference

const progressBar = document.getElementById('progressBar');
const countdownTimer = document.getElementById('countdownTimer');
window.onload = function () {
    const countdownWidth = countdownTimer.offsetWidth;
    progressBar.style.width = countdownWidth + 'px';
    progressBar.classList.remove('hide');
    countdownTimer.classList.remove('hide');
}

let endDate = new Date(new Date(localStorage.getItem('startDate')).getTime() + 86400000);

let countdown = setInterval(function () {
    let now = new Date();
    let timeRemaining = new Date(endDate).getTime() - now.getTime();

    // let countdownDisplay = document.querySelector('#countdown');

    // countdownDisplay.innerText = Math.floor(timeRemaining / 1000)

    let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // display the countdown
    let countdown = document.querySelector('#countdown');
    let padZeros = (num) => num.toString().padStart(2, '0');
    countdown.innerText = `${padZeros(hours)}:${padZeros(minutes)}:${padZeros(seconds)}`;
    if (timeRemaining <= 0) {
        checkTime()
    }


    progressBar.value = 864 - timeRemaining / 100000;

}, 1000)

function checkTime() {
    // add conditional to check time
    updateContent(0)
}


//////////// Update the content
function updateContent(currentDay) {
    document.querySelector('#nightmare').innerText = SeededShuffle.unshuffle(diary[0].nightmare.split(' '), 11, true).join(' ')

}

//////////// Comment out for production
document.documentElement.dataset.theme = "dark"; // Forces dark mode