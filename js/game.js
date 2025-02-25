let canvas;
let world;
let keyboard = new Keyboard();

let backgroundSound = new Audio('./audio/mexican_song_background.mp3');
backgroundSound.volume = 0.3;
backgroundSound.loop = true;


function init() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('volume').addEventListener('click', muteGame);
}

function startGame() {
    backgroundSound.play();
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('overlay').style.display = 'none';
    world.startGame();
}

function muteGame() {
    let volumeBtn = document.getElementById('volume');
    if (backgroundSound.paused) {
        backgroundSound.play();
        volumeBtn.innerHTML = `
            <img src="./img/volume_on.svg">
        `;
    } else {
        backgroundSound.pause();
        volumeBtn.innerHTML = `
            <img src="./img/volume_mute.svg">
        `;
    }
}

// Eventlistener for keyboard keys
window.addEventListener('keypress', event => {
    switch (event.code) {
        case "KeyW":
            keyboard.UP = true;
            break;

        case "KeyA":
            keyboard.LEFT = true;
            break;

        case "KeyS":
            keyboard.DOWN = true;
            break;

        case "KeyD":
            keyboard.RIGHT = true;
            break;

        case "Space":
            keyboard.SPACE = true;
            break;

        case "KeyF":
            keyboard.THROW = true;
            break;

        default:
            break;
    }
});


// Eventlistener for arrow keys
window.addEventListener('keydown', event => {
    switch (event.code) {
        case "ArrowUp":
            keyboard.UP = true;
            break;

        case "ArrowLeft":
            keyboard.LEFT = true;
            break;

        case "ArrowDown":
            keyboard.DOWN = true;
            break;

        case "ArrowRight":
            keyboard.RIGHT = true;
            break;

        case "Space":
            keyboard.SPACE = true;
            break;
        default:
            break;
    }
});


// Eventlistener for keys up to set variables to false
window.addEventListener('keyup', event => {
    switch (event.code) {
        case "ArrowUp":
            keyboard.UP = false;
            break;

        case "ArrowLeft":
            keyboard.LEFT = false;
            break;

        case "ArrowDown":
            keyboard.DOWN = false;
            break;

        case "ArrowRight":
            keyboard.RIGHT = false;
            break;

        case "Space":
            keyboard.SPACE = false;
            break;

        case "KeyW":
            keyboard.UP = false;
            break;

        case "KeyA":
            keyboard.LEFT = false;
            break;

        case "KeyS":
            keyboard.DOWN = false;
            break;

        case "KeyD":
            keyboard.RIGHT = false;
            break;

        case "KeyF":
            keyboard.THROW = false;
            break;
        default:
            break;
    }
})