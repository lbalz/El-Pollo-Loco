class BottleStatusBar extends StatusBar {
    bottlePercentage = 0;
    BOTTLE_IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

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