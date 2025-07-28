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

    currentDraggedElement = null;
}

function resetGame() {
<<<<<<< Updated upstream
    const iconBox = document.querySelectorAll("icon-box");
=======
    const iconBox = document.querySelector("#icon-box");
>>>>>>> Stashed changes
    const allIcons = document.querySelectorAll(".icon");
    allIcons.forEach (icon => {
        iconBox.appendChild(icon);
    });
    console.log("Music Mixer has been reset.");
}

// Load the New Audio Source

function loadAudio() {
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
    audioel.src = currentSrc;    
    audioel.load();
    playAudio();
}

// Tell the Audio Element to Play

function playAudio() { 
    audioel.play(); 
}

function restartAudio() { 
    audioel.currentTime = 0; 
    playAudio(); 
}

function pauseAudio() { 
    audioel.pause(); 
}

function setVolume() {
    console.log(this.value);
    audioel.volume = (this.value/100); 
}

//Event Listeners

icons.forEach(icon => {
    icon.addEventListener("dragstart", dragStart);
});

targetZones.forEach(target => {
    target.addEventListener("dragover", dragOver);
    target.addEventListener("drop", drop);
});


const resetBtn = document.querySelectorAll("reset-btn");
resetBtn.addEventListener("click", resetGame);

icons.forEach(icon => icon.addEventListener('mouseup', loadAudio));


playbtn.addEventListener('click', playAudio);
pausebtn.addEventListener('click', pauseAudio);

vol.addEventListener('change', setVolume);