/**
 * Base class for all drawable objects in the game
 * Handles image loading, caching, and rendering
 */
class DrawableObject {
    /** 
     * @type {number} 
     * @default 120
     * Horizontal position of the object in pixels 
     */
    positionX = 120;

    /** 
     * @type {number} 
     * @default 280
     * Vertical position of the object in pixels 
     */
    positionY = 280;

    /** 
     * @type {number} 
     * @default 150
     * Height of the object in pixels 
     */
    height = 150;

    /** 
     * @type {number} 
     * @default 100
     * Width of the object in pixels 
     */
    width = 100;

    /** 
     * @type {HTMLImageElement|undefined} 
     * Current image being displayed 
     */
    image;

    /** 
     * @type {Object.<string, HTMLImageElement>} 
     * Cache of loaded images indexed by file path
     */
    imageCache = {};

    /** 
     * @type {number} 
     * @default 0
     * Index of the current image in animation sequence 
     */
    currentImage = 0;

    /** 
     * @type {Object} 
     * Collision offset values for hit detection in pixels
     * @property {number} top - Top offset for collision detection
     * @property {number} right - Right offset for collision detection
     * @property {number} bottom - Bottom offset for collision detection
     * @property {number} left - Left offset for collision detection
     */
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    /**
     * Loads a single image from the specified path
     * @param {string} path - Path to the image file
     * @throws {Error} If the image fails to load
     * @returns {void}
     */
    loadImage(path) {
        this.image = new Image(); // creates new <img> Tag
        this.image.src = path;
    }

    /**
     * Loads multiple images and stores them in the image cache
     * @param {string[]} array - Array of image file paths
     * @throws {Error} If any image fails to load
     * @returns {void}
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @returns {void}
     * @throws {Error} If the image is not loaded or drawing fails
     */
    draw(ctx) {
        try {
            ctx.drawImage(
                this.image,
                this.positionX, 
                this.positionY, 
                this.width, 
                this.height
            );
        } catch (error) {
            console.warn('Error loading Image', error);
        }
    }

    /**
     * Draws the collision frame for debugging purposes
     * Only draws for specific game objects that need collision detection
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @returns {void}
     * @throws {Error} If drawing the frame fails
     */
    drawOffsetFrame(ctx) {
        if (this instanceof Character || 
            this instanceof Chicken || 
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof Bottle) 
            {
                const posX = this.positionX + this.offset.left;
                const posY = this.positionY + this.offset.top;
                const width = this.width - this.offset.left - this.offset.right;
                const height = this.height - this.offset.top - this.offset.bottom;

                ctx.beginPath();
                ctx.lineWidt = '5';
                ctx.strokeStyle = 'red';
                ctx.rect(posX, posY, width, height);
                ctx.stroke();
            }
    }
}