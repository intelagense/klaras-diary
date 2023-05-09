const alice = SeededShuffle.shuffle(`“and what is the use of a book,” thought Alice “without pictures or conversations?”`.split(" "), 4);
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


document.querySelector("#text").innerText = SeededShuffle.unshuffle(alice, 1, true).join(" ");

slider.oninput = function () {
    document.querySelector("#text").innerText = SeededShuffle.unshuffle(alice, this.value, true).join(" ");
}

///////////////////// Remove for production
document.documentElement.dataset.theme = "dark"; // Forces dark mode