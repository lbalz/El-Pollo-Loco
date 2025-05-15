/**
 * Base class for all objects that can move in the game
 * Handles movement, collision, gravity, and status effects
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** 
     * @type {number}
     * @default 0.25
     * Base movement speed of the object in pixels per frame 
     */
    movingSpeed = 0.25;

    /** 
     * @type {boolean}
     * @default false
     * Whether the object is facing the opposite direction 
     */
    otherDirection = false;

    /** 
     * @type {number}
     * @default 0
     * Vertical speed/velocity of the object in pixels per frame 
     */
    speedPosY = 0;

    /** 
     * @type {number}
     * @default 2.5
     * Gravity/acceleration applied to the object in pixels per frame squared
     */
    characterAcceleration = 2.5;

    /** 
     * @type {number}
     * @default 100
     * Current health points of the object (0-100)
     */
    healthPoints = 100;

    /** 
     * @type {number}
     * @default 0
     * Timestamp of the last hit taken in milliseconds
     */
    lastHit = 0;

    /** 
     * @type {number}
     * @default 0
     * Number of coins collected by the object
     */
    coins = 0;

    /** 
     * @type {number}
     * @default 0
     * Timestamp of the last coin collected in milliseconds
     */
    lastCoinHit = 0;

    /** 
     * @type {number}
     * @default 0
     * Number of bottles collected by the object
     */
    bottles = 0;

    /** 
     * @type {number}
     * @default 0
     * Timestamp of the last bottle collected in milliseconds
     */
    lastBottlesHit = 0;

    /** 
     * @type {number}
     * @default 250
     * Health points of the end boss (0-250)
     */
    endbossHealth = 250;

    /** 
     * @type {number}
     * @default 25
     * Damage dealt by bottle hits in health points
     */
    bottleDamage = 25;

    /** 
     * @type {HTMLAudioElement}
     * @constant
     * Sound effect for collecting coins
     */
    collectCoinAudio = new Audio('./audio/collect_coin.mp3');

    /** 
     * @type {HTMLAudioElement}
     * @constant
     * Sound effect for collecting bottles
     */
    collectBottleAudio = new Audio('./audio/collect_bottle.mp3');

    /**
     * Creates a new movable object with default values
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Checks if this object is colliding with another movable object
     * Uses offset values for precise collision detection
     * @param {MovableObject} movableObject - The object to check collision with
     * @returns {boolean} True if objects are colliding
     */
    isColliding(movableObject) {
        return this.positionX + this.width - this.offset.right > movableObject.positionX + movableObject.offset.left &&
            this.positionY + this.height - this.offset.bottom > movableObject.positionY + movableObject.offset.top &&
            this.positionX + this.offset.left < movableObject.positionX + movableObject.width - movableObject.offset.right &&
            this.positionY + this.offset.top < movableObject.positionY + movableObject.height - movableObject.offset.bottom;
    }

    /**
     * Handles coin collection and plays sound effect
     */
    collectCoin() {
        this.collectCoinAudio.play();
        this.coins += 1;
    }

    /**
     * Handles bottle collection and plays sound effect
     */
    collectBottle() {
        this.collectBottleAudio.play();
        this.bottles += 1;
    }

    /**
     * Applies damage to the object and updates last hit timestamp
     */
    getHit() {
        this.healthPoints -= 5;

        if (this.healthPoints < 0) {
            this.healthPoints = 0;
        } else {
            this.lastHit = new Date().getTime(); // Time in ms since 01.01.1970
        }

    }

    /**
     * Checks if the object is currently in hurt state
     * @returns {boolean} True if object was hit within last 0.5 seconds
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 0.5;
    }

    /**
     * Checks if the object has no health remaining
     * @returns {boolean} True if health points are 0
     */
    isDead() {
        return this.healthPoints == 0;
    }

    /**
     * Applies continuous gravity effect to the object
     * Updates vertical position based on speed and acceleration
     */
    applyGravity() {
        setInterval(() => {
            if (this.isNotOnGround() || this.speedPosY > 0) {
                this.positionY -= this.speedPosY;
                this.speedPosY -= this.characterAcceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if object is above ground level
     * @returns {boolean} True if object is in air
     */
    isNotOnGround() {
        if (this instanceof ThrowableObject) { // Throwable Objects shoulds always falls
            return true;
        } else {
            return this.positionY < 250;
        }
    }

    /**
     * Plays animation sequence from provided image array
     * @param {string[]} images - Array of image paths for animation frames
     */
    playAnimation(images) {
        let imagesIndex = this.currentImage % images.length;
        let imagePath = images[imagesIndex];
        this.image = this.imageCache[imagePath];
        this.currentImage++;
    }

    /**
     * Moves the object right if alive
     */
    movingRight() {
        if (this.healthPoints <= 0) return;
        this.positionX += this.movingSpeed;
    }

    /**
     * Moves the object left if alive
     */
    movingLeft() {
        if (this.healthPoints <= 0) return;
        this.positionX -= this.movingSpeed;
    }

    /**
     * Makes the object jump if alive
     * Sets initial vertical speed
     */
    jump() {
        if (this.healthPoints <= 0) return;
        this.speedPosY = 35;
    }
}