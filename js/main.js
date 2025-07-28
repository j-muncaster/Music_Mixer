console.log("JavaScript File is linked");

// Variables

const icons = document.querySelectorAll(".icon");
const targetZones = document.querySelectorAll(".target-zone");

const   iconImage = document.querySelectorAll(".icon img"),
        audioel = document.querySelector('audio'),
        playbtn = document.querySelector('#playButton'),
        pausebtn = document.querySelector('#pauseButton'),
        vol = document.querySelector('#volumeControl');

let currentDraggedElement = null;
let activeAudios = [];


// Functions

function dragStart() {
    console.log("Drag Start Called");
    currentDraggedElement = this;
    console.log(currentDraggedElement);
}

function dragOver(event) {
    event.preventDefault();
    this.classList.add("highlight");
}

function drop(event) {
    event.preventDefault();
    this.classList.remove("highlight");

    if (this.children.length > 0) {
        console.log("This zone already has an icon.");
        return;
    }

    this.appendChild(currentDraggedElement);

    loadAudio.call(currentDraggedElement.querySelector('img'));
    const track = currentDraggedElement.querySelector('img').dataset.trackref;

    if (track) {
        const audio = new Audio(`audio/${track}.mp3`);
        audio.loop = true;
        audio.play();

        currentDraggedElement.audio = audio;
        activeAudios.push(audio);
    } 
    currentDraggedElement = null;
}

function resetGame() {
    const iconBox = document.querySelector("#icon-box");
    const allIcons = document.querySelectorAll(".icon");

    allIcons.forEach(icon => {
        iconBox.appendChild(icon);

        if (icon.audio) {
            icon.audio.pause();
            icon.audio.currentTime = 0;
            icon.audio = null;
        }
    });

    console.log("Music Mixer has been reset.");
}

// Load the New Audio Source

function loadAudio() {   
    const track = this.dataset.trackref;

    let currentSrc = `audio/${track}.mp3`;
    audioel.src = currentSrc;
    audioel.load();
    playAudio();
}

// Tell the Audio Element to Play

function playAudio() {
    activeAudios.forEach(audio => {
        audio.play();
    });
}

function pauseAudio() {
    activeAudios.forEach(audio => audio.pause());
}

function setVolume() {
    const volume = this.value / 100;
    activeAudios.forEach(audio => {
        audio.volume = volume;
    });
}

//Event Listeners

icons.forEach(icon => {
    icon.addEventListener("dragstart", dragStart);
});

targetZones.forEach(target => {
    target.addEventListener("dragover", dragOver);
    target.addEventListener("drop", drop);
});


const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", resetGame);

icons.forEach(icon => icon.addEventListener('click', loadAudio));


playbtn.addEventListener('click', playAudio);
pausebtn.addEventListener('click', pauseAudio);

vol.addEventListener('change', setVolume);