class EndbossStatusBar extends StatusBar {
    endbossHealthPercentage = 0;
    ENDBOSS_HEALTH_POINTS_IMAGES = [
        '../img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    constructor() {
        super();
        this.loadImage('../img/7_statusbars/2_statusbar_endboss/blue/blue0.png');
        this.loadImages(this.ENDBOSS_HEALTH_POINTS_IMAGES);
        this.positionX = 760;
        this.positionY = 10;
        this.width = 300;
        this.height = 75;
        this.setEndbossHealthPercentage(100);
    }
}