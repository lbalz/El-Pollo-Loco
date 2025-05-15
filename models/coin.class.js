/**
 * Class representing a collectible coin object in the game
 * Coins can be collected by the player to increase their score
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
    /** 
     * @type {number} 
     * @constant
     * Initial horizontal position of the coin in pixels
     */
    positionX = 300;

    /** 
     * @type {number} 
     * @constant
     * Initial vertical position of the coin in pixels
     */
    positionY = 500;

    /** 
     * @type {number} 
     * @constant
     * Width of the coin sprite in pixels
     */
    width = 225;

    /** 
     * @type {number} 
     * @constant
     * Height of the coin sprite in pixels
     */
    height = 225;

    /** 
     * @type {Object} 
     * @constant
     * Collision offset values for the coin's hitbox in pixels
     * @property {number} top - Top offset for collision detection
     * @property {number} right - Right offset for collision detection
     * @property {number} bottom - Bottom offset for collision detection
     * @property {number} left - Left offset for collision detection
     */
    offset = {
        top: 80,
        right: 80,
        bottom: 80,
        left: 80
    };

    /**
     * Creates a new coin object at specified position
     * @constructor
     * @param {number} randomPosX - Random horizontal position for the coin in pixels
     * @param {number} randomPosY - Random vertical position for the coin in pixels
     * @throws {Error} If image loading fails
     */
    constructor(randomPosX, randomPosY) {
        super()
        this.loadImage('./img/8_coin/coin_1.png');
        this.positionX = randomPosX;
        this.positionY = randomPosY;
    }
}