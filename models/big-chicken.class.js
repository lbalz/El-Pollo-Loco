/**
 * Class representing a large chicken enemy in the game
 * @extends Chicken
 */
class BigChicken extends Chicken {
    /** @type {number} Vertical position of the big chicken */
    positionY = 540;

    /** @type {number} Height of the big chicken sprite in pixels */
    height = 100;

    /** @type {number} Width of the big chicken sprite in pixels */
    width = 100;

    /** 
     * @type {Object} Collision offset values for the big chicken
     * @property {number} top - Top offset for collision detection
     * @property {number} right - Right offset for collision detection
     * @property {number} bottom - Bottom offset for collision detection
     * @property {number} left - Left offset for collision detection
     */
    offset = {
        top: 5,
        right: 0,
        bottom: 5,
        left: 0
    };

    /** @type {string[]} Array of image paths for the walking animation */
    BIG_CHICKEN_IMAGES_WALKING_PATH = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Creates a new big chicken enemy
     * Initializes position, speed, and animations
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.BIG_CHICKEN_IMAGES_WALKING_PATH);

        this.positionX = this.randomChickenPosition(); 
        this.movingSpeed = 1.5 + Math.random() * 1.25;

        this.animate(this.BIG_CHICKEN_IMAGES_WALKING_PATH);
    }
}