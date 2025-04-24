/**
 * Class representing a game level containing all game objects and their positions
 */
class Level {
    /** @type {MovableObject[]} Array of enemy objects in the level */
    enemies;

    /** @type {MovableObject[]} Array of end boss objects */
    endboss;

    /** @type {Cloud[]} Array of cloud objects for background */
    clouds;

    /** @type {BackgroundObject[]} Array of background objects */
    backgroundObjects;

    /** @type {Coin[]} Array of collectible coin objects */
    coins;

    /** @type {Bottle[]} Array of collectible bottle objects */
    bottles;

    /** @type {number} X position where the character completes the level */
    characterLevelEndPosX = 9775;

    /**
     * Creates a new level with all required game objects
     * @param {MovableObject[]} enemies - Array of enemy objects
     * @param {MovableObject[]} endboss - Array of end boss objects
     * @param {Cloud[]} clouds - Array of cloud objects
     * @param {BackgroundObject[]} backgroundObjects - Array of background objects
     * @param {Coin[]} coins - Array of coin objects
     * @param {Bottle[]} bottles - Array of bottle objects
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}