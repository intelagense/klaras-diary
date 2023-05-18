//////////// HTML elements
const slider = document.getElementById("seedRange");
const decode = document.getElementById("decode");
const helpButton = document.getElementById("helpButton");
const sliderModalElement = document.getElementById("sliderModalElement")
const helpModalElement = document.getElementById("helpModalElement")
const themeToggle = document.querySelector(".theme-toggle");
const confirmButton = document.querySelector("#confirm")
const sliderPhrase = document.querySelector("#sliderPhrase")
const helpClose = document.querySelector("#helpClose")
const helpRestart = document.querySelector("#helpRestart")
const closeButtons = document.querySelectorAll(".close")

//////////// Other variables
const sliderTable = [7, 8, 9, 10, 11]
let currentDay = 1
let currentSeed = 1
const dayValue = 86400000
const startDate = new Date(localStorage.getItem('startDate'));
let nextDate = new Date(startDate.getTime() + 86400000); // First day counter

//////////// Main Event Listeners
window.addEventListener("resize", () => { progressBar.style.width = countdownTimer.offsetWidth + 'px'; }); // Resize progress bar
themeToggle.addEventListener("click", toggleTheme); // Dark light theme button
decode.addEventListener("click", decodeDialogOpen); // Open Decode modal
helpButton.addEventListener("click", helpDialogOpen); //Open Help Modal
confirmButton.addEventListener("click", confirmSeed)  // Confirm  Modal Button
helpRestart.addEventListener("click", restart) //restart button in modal
helpClose.addEventListener("click", closeDialogs)
closeButtons.forEach(button => {
    // Add a click event listener to each close button
    button.addEventListener('click', () => {
        closeDialogs()
    });
});

//////////// Theme switcher
// todo add animation delay and fix icons
function toggleTheme() {
    if (document.documentElement.dataset.theme === "dark") {
        document.documentElement.dataset.theme = "light";
        themeToggle.classList.remove("theme-toggle--toggled");
    } else {
        document.documentElement.dataset.theme = "dark";
        themeToggle.classList.add("theme-toggle--toggled");
    }
}
//////////// Modals
function closeDialogs() {
    sliderModalElement.open = false
    helpModalElement.open = false
}

//////////// Help Modal dialog
helpModalElement.addEventListener("click", e => {
    if (e.target.matches('#helpModalElement')) {
        helpModalElement.open = false
    }
})

function helpDialogOpen() {
    helpModalElement.open = true
}


//////////// Decode Modal dialog

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

seedRange.oninput = function () {
    sliderPhrase.innerText = SeededShuffle.unshuffle(diary[currentDay].phrase.split(' '), sliderTable[this.value - 1], true).join(' ') + '.'
}

function confirmSeed() {
    currentSeed = sliderTable[seedRange.value - 1]
    closeDialogs()
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
    if (currentDay > 9) {
        clearInterval(countdown)
        currentDay = 10
    }
    updateContent(currentDay, currentSeed)

}


//////////// Update the content
function updateContent(currentDay, currentSeed) {


    document.querySelector('#dayNumber').innerText = currentDay
    closeDialogs()
    if (currentDay < 1) {
        clearInterval(countdown)
        currentDay = 0
    } else if (currentDay > 9) {
        clearInterval(countdown)
        currentDay = 10
        document.querySelector("#dream").innerText = "Klara's Nightmare"
        document.querySelector("#life").innerText = "Selt's Nightmare"
        const button = document.createElement('button')
        button.textContent = "Restart from the beginning"
        button.id = "endRestart"
        document.querySelector('#entry').appendChild(button)
        const endRestartButton = document.querySelector("#endRestart")
        endRestartButton.addEventListener("click", restart)
    }

    nextDate.setTime(startDate.getTime() + 86400000 * currentDay);

    document.querySelector('#nightmare').innerHTML = SeededShuffle.unshuffle(diary[currentDay].nightmare.split(' '), currentSeed, true)
        .map(e => {
            for (word of diary[currentDay].weakFlags) {
                e === word ? e = `<u><mark id="${e}">${e}</mark></u>` : null
            }
            for (word of diary[currentDay].strongFlags) {
                e === word ? e = `<u><b><mark class="strongWord" id="${e}">${e}</mark></b></u>` : null
            }
            return e
        })
        .join(' ')
    document.querySelector('#journal').innerHTML = SeededShuffle.unshuffle(diary[currentDay].journal.split(' '), currentSeed, true)
        .map(e => {
            for (word of diary[currentDay].weakFlags) {
                e === word ? e = `<u><mark id="${e}">${e}</mark></u>` : null
            }
            for (word of diary[currentDay].strongFlags) {
                e === word ? e = `<u><b><mark class="strongWord" id="${e}">${e}</mark></b></u>` : null
            }
            return e
        })
        .join(' ')
    document.querySelector('#metadata').innerText = SeededShuffle.unshuffle(diary[currentDay].metadata.split(' '), currentSeed, true).join(' ')

    const markedKeywords = document.querySelectorAll('mark')
    markedKeywords.forEach(item => {
        item.addEventListener("click", (e) => {
            pickFlag(e.target.id, e.target)
        })
    });

}

//////////// Populates Aside

// function pickFlag(target) {
//     console.log(target.id)
//     if (target.classList.contains("strongWord")) {
//         displayStrongFlag(target.id)
//     } else {
//         displayWeakFlag(target.id)
//     }
//     // displayFlag(flags.find(flag => flag.keywords && flag.keywords.includes(id)))
// }

function pickFlag(id, target) {
    if (target.classList.contains("strongWord")) {
        displayStrongFlag(flags.find(flag => flag.keywords && flag.keywords.includes(id)))
    } else {
        displayWeakFlag(flags.find(flag => flag.keywords && flag.keywords.includes(id)))
    }
    // displayFlag(flags.find(flag => flag.keywords && flag.keywords.includes(id)))
}

function displayWeakFlag(obj) {
    document.querySelector("#flagTitle").innerText = "Undefined" // obj.ident
    document.querySelector("#flagDatatype").innerText = "Possible reference to: " + obj.ident //obj.datatype
    document.querySelector("#flagDescription").innerText = SeededShuffle.unshuffle(obj.report.split(' '), currentSeed, true).join(' ').split('.')[0] + '.'
}
function displayStrongFlag(obj) {
    document.querySelector("#flagTitle").innerText = obj.ident
    document.querySelector("#flagDatatype").innerText = obj.datatype
    document.querySelector("#flagDescription").innerText = SeededShuffle.unshuffle(obj.report.split(' '), currentSeed, true).join(' ')
}

//////////// Init
checkTime()

function restart() {
    localStorage.clear()
    location.reload()
}

//////////// Comment out for production
// document.documentElement.dataset.theme = "dark"; // Forces dark mode