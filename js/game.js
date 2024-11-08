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
    console.log(event);
    
    switch (event.code) {
        case "KeyW":
            keyboard.UP = true;
            console.log(event.code, keyboard.UP);
            break;
    
        case "KeyA":
            keyboard.LEFT = true;
            console.log(event.code, keyboard.LEFT);
            break;
        
        case "KeyS":
            keyboard.DOWN = true;
            console.log(event.code, keyboard.LEFT);
            break;

        case "KeyD":
            keyboard.RIGHT = true;
            console.log(event.code, keyboard.LEFT);
            break;

        case "Space":
            keyboard.SPACE = true;
            console.log(event.code, keyboard.SPACE);
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
            console.log(event.code, keyboard.UP);
            break;
    
        case "ArrowLeft":
            keyboard.LEFT = true;
            console.log(event.code, keyboard.LEFT);
            break;
        
        case "ArrowDown":
            keyboard.DOWN = true;
            console.log(event.code, keyboard.LEFT);
            break;

        case "ArrowRight":
            keyboard.RIGHT = true;
            console.log(event.code, keyboard.LEFT);
            break;

        case "Space":
            keyboard.SPACE = true;
            console.log(event.code, keyboard.SPACE);
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
            console.log(event.code, keyboard.UP);
            break;
    
        case "ArrowLeft":
            keyboard.LEFT = false;
            console.log(event.code, keyboard.LEFT);
            break;
        
        case "ArrowDown":
            keyboard.DOWN = false;
            console.log(event.code, keyboard.LEFT);
            break;

        case "ArrowRight":
            keyboard.RIGHT = false;
            console.log(event.code, keyboard.LEFT);
            break;

        case "Space":
            keyboard.SPACE = false;
            console.log(event.code, keyboard.SPACE);
            break;

        case "KeyW":
            keyboard.UP = false;
            console.log(event.code, keyboard.UP);
            break;
    
        case "KeyA":
            keyboard.LEFT = false;
            console.log(event.code, keyboard.LEFT);
            break;
        
        case "KeyS":
            keyboard.DOWN = false;
            console.log(event.code, keyboard.LEFT);
            break;

        case "KeyD":
            keyboard.RIGHT = false;
            console.log(event.code, keyboard.LEFT);
            break;
        default:
            break;
    }
})