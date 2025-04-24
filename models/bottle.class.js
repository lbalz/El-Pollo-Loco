/**
 * Class representing a collectible bottle object in the game
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
    /** @type {number} Initial horizontal position of the bottle */
    positionX = 300;

    /** @type {number} Vertical position of the bottle on ground */
    positionY = 550;

    /** @type {number} Width of the bottle sprite in pixels */
    width = 100;

    /** @type {number} Height of the bottle sprite in pixels */
    height = 100;

    /** 
     * @type {Object} Collision offset values for the bottle
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
     * Creates a new bottle object
     * @param {number} randomPosX - Random horizontal position for the bottle
     */
    constructor(randomPosX) {
        super();
        this.loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.positionX = randomPosX;
    }
}