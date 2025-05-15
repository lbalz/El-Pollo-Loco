/**
/**
 * Class representing a large chicken enemy in the game
 * A stronger variant of the regular chicken with different sprites and attributes
 * @extends Chicken
 */
class BigChicken extends Chicken {
    /** 
     * @type {number} 
     * @constant
     * Vertical position of the big chicken in pixels from the top 
     */
    positionY = 540;

    /** 
     * @type {number} 
     * @constant
     * Height of the big chicken sprite in pixels 
     */
    height = 100;

    /** 
     * @type {number} 
     * @constant
     * Width of the big chicken sprite in pixels 
     */
    width = 100;

    /** 
     * @type {Object} 
     * @constant
     * Collision offset values for the big chicken's hitbox
     * @property {number} top - Top offset for collision detection in pixels
     * @property {number} right - Right offset for collision detection in pixels
     * @property {number} bottom - Bottom offset for collision detection in pixels
     * @property {number} left - Left offset for collision detection in pixels
     */
    offset = {
        top: 5,
        right: 0,
        bottom: 5,
        left: 0
    };

    /** 
     * @type {string[]} 
     * @constant
     * Array of image paths for the walking animation sequence
     */
    BIG_CHICKEN_IMAGES_WALKING_PATH = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Creates a new big chicken enemy
     * Initializes position, speed, and animations
     * @constructor
     * @throws {Error} If image loading fails
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.BIG_CHICKEN_IMAGES_WALKING_PATH);

        this.positionX = this.randomChickenPosition(); 
        this.movingSpeed = 1.5 + Math.random() * 1.25;

        this.animate(this.BIG_CHICKEN_IMAGES_WALKING_PATH);
    }
}