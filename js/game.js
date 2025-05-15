/**
 * Global canvas element used for rendering the game
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Global world instance that manages the game state
 * @type {World}
 */
let world;

/**
 * Global keyboard instance to handle input controls
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Background music for the game
 * @type {HTMLAudioElement}
 */
let backgroundSound = new Audio('./audio/mexican_song_background.mp3');
backgroundSound.volume = 0.3;
backgroundSound.loop = true;

/**
 * Initializes the game by setting up event listeners for various buttons
 * and touch controls
 */
function init() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('volume').addEventListener('click', muteGame);
    document.getElementById('gameplayInfoButton').addEventListener('click', toggleGameplayInfoOverlay);
    document.getElementById('closeInfoButton').addEventListener('click', toggleGameplayInfoOverlay);
    initKeyboardListeners();
    initTouchListeners();
}

/**
 * Starts the game by initializing the canvas, world, and game settings
 * Also handles the display of UI elements and plays background music
 */
function startGame() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('volume').style.display = 'flex';
    document.getElementById('volume').style.top = '24px';
    document.getElementById('gameplayInfoButton').style.display = 'none';

    handleMobileButtons();

    backgroundSound.play();
    world.startGame();
}

/**
 * Shows or hides mobile control buttons based on device orientation
 * If device has touch support and is in landscape mode, shows the buttons
 * Otherwise hides them
 * @returns {void}
 */
function handleMobileButtons() {
    if (navigator.maxTouchPoints > 0) {
        if (window.matchMedia('(orientation: portrait)').matches) {
            hideMobileButtons();
        } else {
            showMobileButtons();
        }
    } else {
        hideMobileButtons();
    }
}

/**
 * Hides the mobile control buttons by setting their container display to none
 * @returns {void}
 */
function hideMobileButtons() {
    document.getElementById('mobileButtonsContainer').style.display = 'none';
}

/**
 * Shows the mobile control buttons by setting their container display to flex
 * @returns {void}
 */
function showMobileButtons() {
    document.getElementById('mobileButtonsContainer').style.display = 'flex';
}

/**
 * Toggles the game audio state and updates the volume button icon accordingly
 * When toggled on, plays background music and unmutes all game sounds
 * When toggled off, pauses background music and mutes all game sounds
 * @returns {void}
 */
function muteGame() {
    let volumeBtn = document.getElementById('volume');

    if (backgroundSound.paused) {
        backgroundSound.play();
        toggleSounds();
        volumeBtn.innerHTML = `
            <img src="./img/volume_on.svg">
        `;
    } else {
        backgroundSound.pause();
        toggleSounds();
        volumeBtn.innerHTML = `
            <img src="./img/volume_mute.svg">
        `;
    }
}

/**
 * Toggles the mute state of all game sound effects
 * Affects walking, jumping, collecting items, bottle breaking, and chicken sounds
 * @returns {void}
 */
function toggleSounds() {
    let walkingSound = world.character.walkingSound;
    let jumpingSound = world.character.jumpingSound;
    let collectCoinSound = world.character.collectCoinAudio;
    let collectBottleSound = world.character.collectBottleAudio;
    let bottleBreakSound = world.bottleBreakSound;
    let chickenSound = world.chickenAudio;

    walkingSound.muted = !walkingSound.muted;
    jumpingSound.muted = !jumpingSound.muted;
    collectCoinSound.muted = !collectCoinSound.muted;
    collectBottleSound.muted = !collectBottleSound.muted;
    bottleBreakSound.muted = !bottleBreakSound.muted;
    chickenSound.muted = !chickenSound.muted;
}

/**
 * Toggles the visibility of the gameplay information overlay
 * Switches between 'flex' and 'none' display states
 * @returns {void}
 */
function toggleGameplayInfoOverlay() {
    let gameplayInfoOverlay = document.getElementById('gameplayInfoOverlay');
    let gameplayInfoOverlayDisplay = window.getComputedStyle(gameplayInfoOverlay).display;
    
    if (gameplayInfoOverlayDisplay === 'none') {
        gameplayInfoOverlay.style.display = 'flex';
    } else {
        gameplayInfoOverlay.style.display = 'none';
    }
}

/**
 * Sets up event listeners for keyboard input using all three types of keyboard events
 * @returns {void}
 */
function initKeyboardListeners() {
    keyPressListeners();
    keyDownListeners();
    keyUpListeners();
}

/**
 * Sets up keypress event listeners for WASD controls, spacebar, and throw action
 * Updates keyboard state based on key presses
 * @returns {void}
 * @listens keypress
 */
function keyPressListeners() {
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
}


/**
 * Sets up keydown event listeners for arrow key controls and spacebar
 * Updates keyboard state based on key down events
 * @returns {void}
 * @listens keydown
 */
function keyDownListeners() {
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
}


/**
 * Sets up keyup event listeners for both WASD and arrow key controls
 * Resets keyboard state when keys are released
 * @returns {void}
 * @listens keyup
 */
function keyUpListeners() {
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
    });
}

/**
 * Initializes touch event listeners for mobile device controls
 * Sets up both touchstart and touchend event handlers
 * @returns {void}
 */
function initTouchListeners() {
    touchstartListeners();
    touchendListeners();
}

/**
 * Sets up touchstart event listeners for mobile control buttons
 * Prevents default touch behavior and updates keyboard state
 * @returns {void}
 * @listens touchstart
 */
function touchstartListeners() {
    document.getElementById('leftButton').addEventListener('touchstart', event => {
        event.preventDefault();
        keyboard.LEFT = true;
    });
    
    document.getElementById('rightButton').addEventListener('touchstart', event => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    
    document.getElementById('jumpButton').addEventListener('touchstart', event => {
        event.preventDefault();
        keyboard.UP = true;
    });
    
    document.getElementById('throwButton').addEventListener('touchstart', event => {
        event.preventDefault();
        keyboard.THROW = true;
    });
}

/**
 * Sets up touchend event listeners for mobile control buttons
 * Prevents default touch behavior and resets keyboard state
 * @returns {void}
 * @listens touchend
 */
function touchendListeners() {
    document.getElementById('leftButton').addEventListener('touchend', event => {
        event.preventDefault();
        keyboard.LEFT = false;
    });
    
    document.getElementById('rightButton').addEventListener('touchend', event => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });
    
    document.getElementById('jumpButton').addEventListener('touchend', event => {
        event.preventDefault();
        keyboard.UP = false;
    });
    
    document.getElementById('throwButton').addEventListener('touchend', event => {
        event.preventDefault();
        keyboard.THROW = false;
    });
}