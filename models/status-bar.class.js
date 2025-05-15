/**
 * Class representing a status bar that displays various game statistics
 * Handles health, coins, bottles, and boss health display
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Creates a new status bar instance
     * Initializes display values and loads required images
     * @constructor
     * @throws {Error} If image loading fails
     */
    constructor() {
        super();
    }

    /**
     * Updates the health percentage display
     * @param {number} healthPercentage - Current health percentage (0-100)
     * @throws {Error} If percentage is not a number or outside valid range
     * @returns {void}
     */
    setHealthPercentage(healthPercentage) {
        this.healthPercentage = healthPercentage;

        let path = this.HEALTH_POINTS_IMAGES[this.getHealthImageIndex()];
        this.image = this.imageCache[path];
    }

    /**
     * Updates the coins collected display
     * @param {number} coinsPercentage - Number of coins collected (0-20)
     * @throws {Error} If count is not a number or outside valid range
     * @returns {void}
     */
    setCoinsPercentage(coinsPercentage) {
        this.coinsPercentage = coinsPercentage;

        let path = this.COINS_IMAGES[this.getCoinImageIndex()];
        this.image = this.imageCache[path];
    }

    /**
     * Updates the bottles collected display
     * @param {number} bottlesPercentage - Number of bottles collected (0-10)
     * @throws {Error} If count is not a number or outside valid range
     * @returns {void}
     */
    setBottlesPercentage(bottlesPercentage) {
        this.bottlesPercentage = bottlesPercentage;

        let path = this.BOTTLE_IMAGES[this.getBottleImageIndex()];
        this.image = this.imageCache[path];
    }

    /**
     * Updates the end boss health display
     * @param {number} endbossHealthPercentage - Current boss health (0-250)
     * @throws {Error} If health is not a number or outside valid range
     * @returns {void}
     */
    setEndbossHealthPercentage(endbossHealthPercentage) {
        this.endbossHealthPercentage = endbossHealthPercentage;

        let path = this.ENDBOSS_HEALTH_POINTS_IMAGES[this.getEndbossHealthImageIndex()];
        this.image = this.imageCache[path];
    }

    /**
     * Calculates the appropriate health bar image index based on current health
     * @returns {number} Index of the health bar image (0-5)
     * @private
     */
    getHealthImageIndex() {
        if (this.healthPercentage >= 100) {
            return 5;
        } else if (this.healthPercentage > 80) {
            return 4;
        } else if (this.healthPercentage > 60) {
            return 3;
        } else if (this.healthPercentage > 40) {
            return 2;
        } else if (this.healthPercentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Calculates the appropriate coin counter image index based on coins collected
     * @returns {number} Index of the coin counter image (0-5)
     * @private
     */
    getCoinImageIndex() {
        if (this.coinsPercentage >= 20) {
            return 5;
        } else if (this.coinsPercentage >= 16) {
            return 4;
        } else if (this.coinsPercentage >= 12) {
            return 3;
        } else if (this.coinsPercentage >= 8) {
            return 2;
        } else if (this.coinsPercentage >= 4) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Calculates the appropriate bottle counter image index based on bottles collected
     * @returns {number} Index of the bottle counter image (0-5)
     * @private
     */
    getBottleImageIndex() {
        if (this.bottlesPercentage >= 10) {
            return 5;
        } else if (this.bottlesPercentage >= 8) {
            return 4;
        } else if (this.bottlesPercentage >= 6) {
            return 3;
        } else if (this.bottlesPercentage >= 4) {
            return 2;
        } else if (this.bottlesPercentage >= 2) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Calculates the appropriate boss health bar image index based on boss health
     * @returns {number} Index of the boss health bar image (0-5)
     * @private
     */
    getEndbossHealthImageIndex() {
        if (this.endbossHealthPercentage >= 200) {
            return 5;
        } else if (this.endbossHealthPercentage >= 150) {
            return 4;
        } else if (this.endbossHealthPercentage >= 100) {
            return 3;
        } else if (this.endbossHealthPercentage >= 50) {
            return 2;
        } else if (this.endbossHealthPercentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}