/**
 * Class representing the bottle collection status bar in the game
 * @extends StatusBar
 */
class BottleStatusBar extends StatusBar {
    /** @type {number} Current percentage of bottles collected */
    bottlePercentage = 0;

    /** 
     * @type {string[]} Array of image paths for different bottle status bar states
     * Images represent 0%, 20%, 40%, 60%, 80%, and 100% states
     */
    BOTTLE_IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Creates a new bottle status bar
     * Initializes position, dimensions, and initial bottle percentage
     */
    constructor() {
        super();
        this.loadImage('./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.positionX = 15;
        this.positionY = 150;
        this.width = 300;
        this.height = 75;
        this.setBottlesPercentage(0);
    }
}