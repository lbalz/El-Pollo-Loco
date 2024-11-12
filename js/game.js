let canvas;
let world;
let keyboard = new Keyboard();

// drawImage(img, x, y, width, height)

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log(world.character, world.enemies);
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

        default:
            break;
    }
});


// Eventlistener for arrow keys
window.addEventListener('keydown', event => {
    console.log(event);

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
    console.log(event);

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
        default:
            break;
    }
})