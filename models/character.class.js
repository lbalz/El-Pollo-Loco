/**
 * Class representing the main playable character in the game
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {number} Vertical position of the character */
    positionY = 255; 

    /** @type {number} Horizontal position of the character */
    positionX = 25;

    /** @type {number} Height of the character sprite in pixels */
    height = 400;

    /** @type {number} Width of the character sprite in pixels */
    width = 200;

    /** @type {number} Movement speed of the character */
    movingSpeed = 15;

    /** @type {World} Reference to the game world */
    world;

    /** 
     * @type {Object} Collision offset values for the character
     * @property {number} top - Top offset for collision detection
     * @property {number} right - Right offset for collision detection
     * @property {number} bottom - Bottom offset for collision detection
     * @property {number} left - Left offset for collision detection
     */
    offset = {
        top: 150,
        right: 30,
        bottom: 20,
        left: 30
    };

    /** @type {number} Timestamp of the last character movement */
    lastMovement = new Date().getTime();

    /** @type {number} Timer for idle animations */
    idleTimer = 0;

    /** @type {number} Speed of idle animations in milliseconds */
    IDLE_ANIMATION_SPEED = 200;

    /** @type {number} Delay before long idle animation starts */
    LONG_IDLE_DELAY = 5000;

    /** @type {string} Current animation state of the character */
    currentAnimation = 'idle';

    /** @type {string[]} Array of image paths for walking animation */
    PEPE_WALKING_IMAGE_PATHS = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} Array of image paths for jumping animation */
    PEPE_JUMPING_IMAGE_PATHS = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    /** @type {string[]} Array of image paths for dying animation */
    PEPE_DYING_IMAGE_PATHS = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];

    /** @type {string[]} Array of image paths for hurt animation */
    PEPE_HURT_IMAGE_PATHS = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    /** @type {string[]} Array of image paths for idle animation */
    PEPE_IDLE_IMAGE_PATHS = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /** @type {string[]} Array of image paths for long idle animation */
    PEPE_LONG_IDLE_IMAGE_PATHS = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /** @type {HTMLAudioElement} Sound effect for walking */
    walkingSound = new Audio('./audio/walking_steps.mp3');
    
    /** @type {number} Start time for walking sound loop */
    walkingSoundLoopStart = 3.1;

    /** @type {number} End time for walking sound loop */
    walkingSoundLoopEnd = 4;

    /** @type {HTMLAudioElement} Sound effect for jumping */
    jumpingSound = new Audio('./audio/jump.mp3');

    /** @type {number} Start time for jumping sound loop */
    jumpingSoundLoopStart = 0;

    /** @type {number} End time for jumping sound loop */
    jumpingSoundLoopEnd = 1.5;

    /**
     * Creates a new character instance and initializes animations and controls
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.PEPE_WALKING_IMAGE_PATHS);
        this.loadImages(this.PEPE_JUMPING_IMAGE_PATHS);
        this.loadImages(this.PEPE_DYING_IMAGE_PATHS);
        this.loadImages(this.PEPE_HURT_IMAGE_PATHS);
        this.loadImages(this.PEPE_IDLE_IMAGE_PATHS);
        this.loadImages(this.PEPE_LONG_IDLE_IMAGE_PATHS);
        this.applyGravity();
        this.animate();
        // this.godMode(); // Godmode for developing game without dying and inifite bottles
    }

    /**
     * Sets up character animation loops and movement controls
     * Handles walking, jumping, and idle animations
     */
    animate() {
        this.initializeSounds();
        this.setupSoundLoops();
        
        setInterval(() => {
            this.handleMovement();
            this.updateCameraPosition();
        }, 1000 / 60);
    
        setInterval(() => {
            this.updateCharacterState();
        }, this.IDLE_ANIMATION_SPEED);
    }
    
    /**
     * Initializes sound settings for walking and jumping
     */
    initializeSounds() {
        this.walkingSound.currentTime = this.walkingSoundLoopStart;
        this.walkingSound.playbackRate = 2.0;
        this.jumpingSound.currentTime = this.jumpingSoundLoopStart;
        this.jumpingSound.playbackRate = 1.5;
    }
    
    /**
     * Sets up sound loop event listeners
     */
    setupSoundLoops() {
        this.walkingSound.addEventListener('timeupdate', () => {
            if (this.walkingSound.currentTime >= this.walkingSoundLoopEnd) {
                this.walkingSound.currentTime = this.walkingSoundLoopStart;
            }
        });
    
        this.jumpingSound.addEventListener('timeupdate', () => {
            if (this.jumpingSound.currentTime >= this.jumpingSoundLoopEnd) {
                this.jumpingSound.currentTime = this.jumpingSoundLoopStart;
            }
        });
    }
    
    /**
     * Handles character movement and related animations
     */
    handleMovement() {
        this.walkingSound.pause();
        this.checkKeyboardInput();
        this.handleRightMovement();
        this.handleLeftMovement();
        this.handleJump();
    }
    
    /**
     * Checks keyboard input and updates animation state
     */
    checkKeyboardInput() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || 
            this.world.keyboard.UP || this.world.keyboard.SPACE) {
            this.lastMovement = new Date().getTime();
            this.currentAnimation = 'walking';
        }
    }
    
    /**
     * Handles right movement logic
     */
    handleRightMovement() {
        if (this.world.keyboard.RIGHT && this.positionX < this.world.level.characterLevelEndPosX) {
            this.movingRight();
            this.otherDirection = false;
            if (!this.isNotOnGround()) this.walkingSound.play();
        }
    }
    
    /**
     * Handles left movement logic
     */
    handleLeftMovement() {
        if (this.world.keyboard.LEFT && this.positionX > 0) {
            this.movingLeft();
            this.otherDirection = true;
            if (!this.isNotOnGround()) this.walkingSound.play();
        }
    }
    
    /**
     * Handles jump logic
     */
    handleJump() {
        if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isNotOnGround()) {
            this.jumpingSound.play();
            this.jump();
        }
    }
    
    /**
     * Updates camera position relative to character
     */
    updateCameraPosition() {
        this.world.camPosX = -this.positionX + 150;
    }
    
    /**
     * Updates character state and animations
     */
    updateCharacterState() {
        if (this.isDead()) {
            this.playAnimation(this.PEPE_DYING_IMAGE_PATHS);
        } else if (this.isHurt()) {
            this.playAnimation(this.PEPE_HURT_IMAGE_PATHS);
        } else if (this.isNotOnGround()) {
            this.playAnimation(this.PEPE_JUMPING_IMAGE_PATHS);
        } else {
            this.updateIdleAnimations();
        }
    }
    
    /**
     * Updates the character's idle animations based on movement state
     * Switches between normal idle and long idle animations
     */
    updateIdleAnimations() {
        let currentTime = new Date().getTime();
        let timeSinceLastMovement = currentTime - this.lastMovement;

        if (timeSinceLastMovement > this.LONG_IDLE_DELAY) { 
            if (this.currentAnimation !== 'long_idle') {
                this.currentAnimation = 'long_idle';
                this.idleTimer = 0;
            }
            this.playAnimation(this.PEPE_LONG_IDLE_IMAGE_PATHS);
        } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            if (this.currentAnimation !== 'idle') {
                this.currentAnimation = 'idle';
                this.idleTimer = 0;
            }
            this.playAnimation(this.PEPE_IDLE_IMAGE_PATHS);
        } else {
            this.playAnimation(this.PEPE_WALKING_IMAGE_PATHS);
        }
    }

    /**
     * Makes the character jump if they're alive
     * @returns {void}
     */
    jump() {
        if (this.healthPoints <= 0) return;
        this.speedPosY = 35;
    }

    /**
     * Activates god mode for development/testing
     * Gives infinite health and bottles
     */
    godMode() {
        this.bottles = 20;
        this.coins = 20;
        setInterval( () => {
            this.movingSpeed = 35;
            this.healthPoints = 150;
        }, 250);
    }
}