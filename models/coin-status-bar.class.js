/**
 * Class representing the coin collection status bar in the game
 * @extends StatusBar
 */
class CoinStatusBar extends StatusBar {
    /** @type {number} Current percentage of coins collected */
    coinPercentage = 0;

    /** 
     * @type {string[]} Array of image paths for different coin status bar states
     * Images represent coin collection states from 0 to 20 coins (0% to 100%)
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