/**
 * Class representing a background object in the game.
 * Handles the rendering of background elements like sky, mountains, and ground.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** 
     * Width of the background object in pixels
     * @type {number}
     * @constant
     */
    width = 1080;

    /** 
     * Height of the background object in pixels
     * @type {number}
     * @constant
     */
    height = 720;

    /**
     * Creates a new background object
     * @param {string} imagePath - Path to the background image file
     * @param {number} positionX - Initial X position of the background object
     * @throws {Error} If imagePath is invalid or image fails to load
     */
    constructor(imagePath, positionX) {
        super().loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = 720 - this.height;
    }
}