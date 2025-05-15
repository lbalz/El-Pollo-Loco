/**
 * Class representing a moving cloud in the game background
 * Provides ambient background movement with continuous scrolling
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** 
     * @type {number} 
     * @constant
     * Vertical position of the cloud from top of screen in pixels
     */
    positionY = 20;

    /** 
     * @type {number} 
     * @constant
     * Width of the cloud sprite in pixels
     */
    width = 500;

    /** 
     * @type {number} 
     * @constant
     * Height of the cloud sprite in pixels
     */
    height = 250;

    /**
     * Creates a new cloud instance and initializes its position
     * Loads cloud image and starts movement animation
     * @constructor
     * @throws {Error} If image loading fails
     */
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.positionX = Math.floor(Math.random() * 9000);
        this.startAnimate();
    }

    /**
     * Starts the cloud's continuous left movement animation
     * Updates position 60 times per second (60 FPS)
     * @returns {void}
     */
    startAnimate() {
        setInterval(() => {
            this.movingLeft();
        }, 1000 / 60);
    }
}