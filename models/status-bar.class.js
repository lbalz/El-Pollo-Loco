class StatusBar extends DrawableObject {
    
    //TODO: FIX -> Refactor StatusBar class to create a new StatusBar with Input
    //TODO: FIX -> instead of hardcoding all statusbars in this class

    //TODO: FIX -> StatusBar as super() class and create individual statusbars for
    //TODO: FIX -> coins, health & bottles
    HEALTH_POINTS_IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    healthPercentage = 0;



    constructor() {
        super();
        this.loadImage('./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png');
        this.loadImages(this.HEALTH_POINTS_IMAGES);
        this.positionX = 25;
        this.positionY = 0;
        this.width = 300;
        this.height = 100;
        this.setHealthPercentage(100);
    }

    drawStatusText() {
        // Idee: da die Statusbalken nur alle 20 punkte z.B. ein neues Bild haben
        // evtl. einen Statustext direkt neben dem balken anzeigen wieviel hp punkte, coins oder flaschen man hat
    }

    setHealthPercentage(healthPercentage) {
        this.healthPercentage = healthPercentage;

        let path = this.HEALTH_POINTS_IMAGES[this.getImageIndex()];
        this.image = this.imageCache[path];
    }

    getImageIndex() {
        if (this.healthPercentage == 100) {
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
}