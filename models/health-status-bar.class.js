class HealthStatusBar extends StatusBar {
    healthPercentage = 0;
    HEALTH_POINTS_IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

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