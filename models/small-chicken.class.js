/**
 * Class representing a small chicken enemy in the game
 * @extends Chicken
 */
class SmallChicken extends Chicken {
    /** @type {number} Vertical position of the small chicken */
    positionY = 565;

    /** @type {number} Height of the small chicken sprite in pixels */
    height = 75;

    /** @type {number} Width of the small chicken sprite in pixels */
    width = 75;

    /** 
     * @type {Object} Collision offset values for the small chicken
     * @property {number} top - Top offset for collision detection
     * @property {number} right - Right offset for collision detection
     * @property {number} bottom - Bottom offset for collision detection
     * @property {number} left - Left offset for collision detection
     */
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };

    /** 
     * @type {string[]} Array of image paths for walking animation
     * Contains three frames of walking animation
     */
    SMALL_CHICKEN_IMAGES_WALKING_PATH = [
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /**
     * Creates a new small chicken enemy
     * Initializes position, speed, and starts walking animation
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.SMALL_CHICKEN_IMAGES_WALKING_PATH);

        this.positionX = this.randomChickenPosition(); 
        this.movingSpeed = 1.5 + Math.random() * 1.25;

        this.animate(this.SMALL_CHICKEN_IMAGES_WALKING_PATH);
    }
}