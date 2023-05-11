//////////// HTML elements
const slider = document.getElementById("seedRange");
const decode = document.getElementById("decode");
const sliderModalElement = document.getElementById("sliderModalElement")
const closeButton = document.querySelector(".close")
const themeToggle = document.querySelector(".theme-toggle");
const confirmButton = document.querySelector("#confirm")
const sliderPhrase = document.querySelector('#sliderPhrase')

//////////// Other variables
const sliderTable = [7, 8, 9, 10, 11]
let currentDay = 1
let currentSeed = 1
const dayValue = 86400000
const startDate = new Date(localStorage.getItem('startDate'));
let nextDate = new Date(startDate.getTime() + 86400000); // First day counter

//////////// Event Listeners
window.addEventListener("resize", () => { progressBar.style.width = countdownTimer.offsetWidth + 'px'; }); // Resize progress bar
themeToggle.addEventListener("click", toggleTheme); // Dark light theme button
decode.addEventListener("click", decodeDialogOpen); // Open modal
closeButton.addEventListener("click", decodeDialogClose); // Close modal
confirmButton.addEventListener("click", confirmSeed)  // Confirm  Modal Button


//////////// Theme switcher
// todo add animation delay and fix icons
function toggleTheme() {
    if (document.documentElement.dataset.theme === "dark") {
        document.documentElement.dataset.theme = "light";
        themeToggle.classList.remove = "theme-toggle--toggled"; //fix this
    } else {
        document.documentElement.dataset.theme = "dark";
        themeToggle.classList.add = "theme-toggle--toggled"; //fix this
    }
}

//////////// Modal dialog

sliderModalElement.addEventListener("click", e => {
    if (e.target.matches('#sliderModalElement')) {
        sliderModalElement.open = false
    }
})

function decodeDialogOpen() {
    // Randomizes the lookup table on each dialog open but preserves the values while it is open.
    SeededShuffle.shuffle(sliderTable, Math.floor(Math.random() * 5) + 1)
    sliderPhrase.innerText = SeededShuffle.unshuffle(diary[currentDay].phrase.split(' '), sliderTable[0], true).join(' ') + '.'
    sliderModalElement.open = true
}

function decodeDialogClose() {
    sliderModalElement.open = false
}

seedRange.onchange = function () {
    sliderPhrase.innerText = SeededShuffle.unshuffle(diary[currentDay].phrase.split(' '), sliderTable[this.value - 1], true).join(' ') + '.'
}

function confirmSeed() {
    currentSeed = sliderTable[seedRange.value - 1]
    decodeDialogClose()
    updateContent(currentDay, currentSeed)
}

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




let countdown = setInterval(function () {
    let now = new Date();
    let timeRemaining = new Date(nextDate).getTime() - now.getTime();

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
    const theMathPart = (1000 * 60 * 60 * 24)
    let elapsedTime = (new Date().getTime() - startDate.getTime()) / theMathPart
    //get difference in days and switch case them
    // currentTime - 
    // startDate + dayValue * 1 through 10
    // 
    // timeRemaining = new Date(nextDate).getTime() - now.getTime();
    currentDay = Math.floor(elapsedTime) + 1
    updateContent(currentDay, currentSeed)

}


//////////// Update the content
function updateContent(currentDay, currentSeed) {
    document.querySelector('#dayNumber').innerText = currentDay
    decodeDialogClose()
    if (currentDay < 1) {
        clearInterval(countdown)
        currentDay = 0
    } else if (currentDay > 9) {
        clearInterval(countdown)
        currentDay = 10
    }

    nextDate.setTime(startDate.getTime() + 86400000 * currentDay);

    document.querySelector('#nightmare').innerText = SeededShuffle.unshuffle(diary[currentDay].nightmare.split(' '), currentSeed, true).join(' ')
    // document.querySelector('#nightmare').innerText = SeededShuffle.unshuffle(diary[currentDay].nightmare.split(' '), currentSeed, true).map(e => e.includes(...diary[currentDay].nightmareFlags.some()) ? e : ' ').join(' ')
    document.querySelector('#journal').innerText = SeededShuffle.unshuffle(diary[currentDay].journal.split(' '), currentSeed, true).join(' ')
    document.querySelector('#metadata').innerText = SeededShuffle.unshuffle(diary[currentDay].metadata.split(' '), currentSeed, true).join(' ')

}

checkTime()
//////////// Comment out for production
document.documentElement.dataset.theme = "dark"; // Forces dark mode