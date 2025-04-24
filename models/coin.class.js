/**
 * Class representing a collectible coin object in the game
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
    /** @type {number} Initial horizontal position of the coin */
    positionX = 300;

    /** @type {number} Initial vertical position of the coin */
    positionY = 500;

    /** @type {number} Width of the coin sprite in pixels */
    width = 225;

    /** @type {number} Height of the coin sprite in pixels */
    height = 225;

    /** 
     * @type {Object} Collision offset values for the coin
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
     * @param {number} randomPosX - Random horizontal position for the coin
     * @param {number} randomPosY - Random vertical position for the coin
     */
    constructor(randomPosX, randomPosY) {
        super()
        this.loadImage('./img/8_coin/coin_1.png');
        this.positionX = randomPosX;
        this.positionY = randomPosY;
    }
}