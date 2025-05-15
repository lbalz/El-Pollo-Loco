/**
 * Class representing a collectible bottle object in the game
 * Bottles can be collected by the player and used as throwable weapons
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
    /** 
     * @type {number} 
     * @constant
     * Initial horizontal position of the bottle in pixels
     */
    positionX = 300;

    /** 
     * @type {number}
     * @constant 
     * Vertical position of the bottle on ground in pixels
     */
    positionY = 550;

    /** 
     * @type {number}
     * @constant 
     * Width of the bottle sprite in pixels
     */
    width = 100;

    /** 
     * @type {number}
     * @constant 
     * Height of the bottle sprite in pixels
     */
    height = 100;

    /** 
     * @type {Object}
     * @constant
     * Collision offset values for the bottle's hitbox in pixels
     * @property {number} top - Top offset for collision detection
     * @property {number} right - Right offset for collision detection
     * @property {number} bottom - Bottom offset for collision detection
     * @property {number} left - Left offset for collision detection
     */
    offset = {
        top: 20,
        right: 25,
        bottom: 10,
        left: 25
    };

    /**
     * Creates a new bottle object at a specified horizontal position
     * @constructor
     * @param {number} randomPosX - Random horizontal position for the bottle in pixels
     * @throws {Error} If image loading fails
     */
    constructor(randomPosX) {
        super();
        this.loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.positionX = randomPosX;
    }
}