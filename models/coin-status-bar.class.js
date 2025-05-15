/**
 * Class representing the coin collection status bar in the game
 * Displays the percentage of coins collected by the player
 * @extends StatusBar
 */
class CoinStatusBar extends StatusBar {
    /** 
     * @type {number} 
     * @default 0
     * Current percentage of coins collected (0-100)
     */
    coinPercentage = 0;

    /** 
     * @type {string[]} 
     * @constant
     * Array of image paths for different coin status bar states
     * Images represent coin collection states from 0% to 100% in 20% increments
     */
    COINS_IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    /**
     * Creates a new coin status bar
     * Initializes position, dimensions, and initial coin percentage
     * @constructor
     * @throws {Error} If image loading fails
     */
    constructor() {
        super();
        this.loadImage('./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.COINS_IMAGES);
        this.positionX = 15;
        this.positionY = 75;
        this.width = 300;
        this.height = 75;
        this.setCoinsPercentage(0);
    }
}