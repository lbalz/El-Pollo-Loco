/**
 * Class representing a throwable object (bottle) in the game
 * Handles throwing physics and direction
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Creates a new throwable object
     * @param {number} posX - Initial X position of the throw in pixels
     * @param {number} posY - Initial Y position of the throw in pixels
     * @param {boolean} characterDirection - Direction of throw (true for left, false for right)
     * @throws {Error} If image loading fails
     * @constructor
     */
    constructor(posX, posY, characterDirection) {
        super();
        this.loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.positionX = 100;
        this.positionY = 100;
        this.height = 100;
        this.width = 100;
        if (characterDirection) {
            this.throwBottleLeft(posX, posY);
        } else {
            this.throwBottleRight(posX, posY);
        }
        
    }

    /**
     * Throws the bottle to the right
     * Applies gravity and horizontal movement
     * @param {number} posX - Starting X position in pixels
     * @param {number} posY - Starting Y position in pixels
     * @returns {void}
     */
    throwBottleRight(posX, posY) {
        this.positionX = posX;
        this.positionY = posY;
        this.speedPosY = 40;
        this.applyGravity();
        setInterval( () => {
            this.positionX += 20;
        }, 50);
    }

    /**
     * Throws the bottle to the left
     * Applies gravity and horizontal movement
     * @param {number} posX - Starting X position in pixels
     * @param {number} posY - Starting Y position in pixels
     * @returns {void}
     */
    throwBottleLeft(posX, posY) {
        this.positionX = posX;
        this.positionY = posY;
        this.speedPosY = 40;
        this.applyGravity();
        setInterval( () => {
            this.positionX -= 20;
        }, 50);
    }
}