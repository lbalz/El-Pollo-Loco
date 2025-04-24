/**
 * Base class for all objects that can move in the game
 * Handles movement, collision, gravity, and status effects
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** @type {number} Base movement speed of the object */
    movingSpeed = 0.25;

    /** @type {boolean} Whether the object is facing the opposite direction */
    otherDirection = false;

    /** @type {number} Vertical speed/velocity of the object */
    speedPosY = 0;

    /** @type {number} Gravity/acceleration applied to the object */
    characterAcceleration = 2.5;

    /** @type {number} Current health points of the object */
    healthPoints = 100;

    /** @type {number} Timestamp of the last hit taken */
    lastHit = 0;

    /** @type {number} Number of coins collected */
    coins = 0;

    /** @type {number} Timestamp of the last coin collected */
    lastCoinHit = 0;

    /** @type {number} Number of bottles collected */
    bottles = 0;

    /** @type {number} Timestamp of the last bottle collected */
    lastBottlesHit = 0;

    /** @type {number} Health points of the end boss */
    endbossHealth = 250;

    /** @type {number} Damage dealt by bottle hits */
    bottleDamage = 25;

    /** @type {HTMLAudioElement} Sound effect for collecting coins */
    collectCoinAudio = new Audio('./audio/collect_coin.mp3');

    /** @type {HTMLAudioElement} Sound effect for collecting bottles */
    collectBottleAudio = new Audio('./audio/collect_bottle.mp3');

    /**
     * Creates a new movable object
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