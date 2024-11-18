class CoinStatusBar extends StatusBar {
    coinPercentage = 0;
    COINS_IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png', // 0 Coins
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png', // 4 Coins
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png', // 8 Coins
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png', // 12 Coins
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png', // 16 Coins
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png', // 20 Coins
    ];

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