/**
 * Class representing a background object in the game
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** @type {number} Width of the background object in pixels */
    width = 1080;

    /** @type {number} Height of the background object in pixels */
    height = 720;

    /**
     * Creates a new background object
     * @param {string} imagePath - Path to the background image file
     * @param {number} positionX - Initial X position of the background object
     */
    constructor(imagePath, positionX) {
        super().loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = 720 - this.height;
    }
}