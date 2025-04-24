/**
 * Class representing the health status bar for the end boss
 * @extends StatusBar
 */
class EndbossStatusBar extends StatusBar {
    /** @type {number} Current health percentage of the end boss */
    endbossHealthPercentage = 0;

    /** 
     * @type {string[]} Array of image paths for different health bar states
     * Images represent health states from 0% to 100% in 20% increments
     */
    ENDBOSS_HEALTH_POINTS_IMAGES = [
        '../img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * Creates a new end boss status bar
     * Initializes position, dimensions, and initial health percentage
     */
    constructor() {
        super();
        this.loadImage('../img/7_statusbars/2_statusbar_endboss/blue/blue0.png');
        this.loadImages(this.ENDBOSS_HEALTH_POINTS_IMAGES);
        this.positionX = 760;
        this.positionY = 10;
        this.width = 300;
        this.height = 75;
        this.setEndbossHealthPercentage(250);
    }
}