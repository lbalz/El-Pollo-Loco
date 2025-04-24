/**
 * Class representing the health status bar for the player character
 * @extends StatusBar
 */
class HealthStatusBar extends StatusBar {
    /** @type {number} Current health percentage of the character */
    healthPercentage = 0;

    /** 
     * @type {string[]} Array of image paths for different health bar states
     * Images represent health states from 0% to 100% in 20% increments
     */
    HEALTH_POINTS_IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    /**
     * Creates a new health status bar
     * Initializes position, dimensions, and sets initial health to 100%
     */
    constructor() {
        super();
        this.loadImage('./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png');
        this.loadImages(this.HEALTH_POINTS_IMAGES);
        this.positionX = 15;
        this.positionY = 0;
        this.width = 300;
        this.height = 75;
        this.setHealthPercentage(100);
    }
}