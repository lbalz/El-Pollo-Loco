/**
 * Class representing a game level containing all game objects and their positions
 * Manages level layout, enemies, collectibles, and environment objects
 */
class Level {
    /** 
     * @type {MovableObject[]} 
     * Array of enemy objects (chickens) in the level
     */
    enemies;

    /** 
     * @type {MovableObject[]} 
     * Array of end boss objects (typically contains single boss)
     */
    endboss;

    /** 
     * @type {Cloud[]} 
     * Array of cloud objects for parallax background effect
     */
    clouds;

    /** 
     * @type {BackgroundObject[]} 
     * Array of background objects for level scenery
     */
    backgroundObjects;

    /** 
     * @type {Coin[]} 
     * Array of collectible coin objects for scoring
     */
    coins;

    /** 
     * @type {Bottle[]} 
     * Array of collectible bottle objects used as weapons
     */
    bottles;

    /** 
     * @type {number}
     * @constant
     * X position in pixels where the character can move further in the level
     * This is the end position of the level
     */
    characterLevelEndPosX = 9775;

    /**
     * Creates a new level with all required game objects
     * @constructor
     * @param {MovableObject[]} enemies - Array of enemy objects (chickens)
     * @param {MovableObject[]} endboss - Array of end boss objects
     * @param {Cloud[]} clouds - Array of cloud objects for background
     * @param {BackgroundObject[]} backgroundObjects - Array of background scenery
     * @param {Coin[]} coins - Array of collectible coins
     * @param {Bottle[]} bottles - Array of collectible bottles
     * @throws {Error} If required arrays are undefined or null
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        if (!enemies || !endboss || !clouds || !backgroundObjects || !coins || !bottles) {
            throw new Error('All level object arrays must be defined');
        }
        
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}