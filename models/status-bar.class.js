class StatusBar extends DrawableObject {
    
    
    //TODO: FIX -> Refactor StatusBar class to create a new StatusBar with Input
    //TODO: FIX -> instead of hardcoding all statusbars in this class

    //TODO: FIX -> StatusBar as super() class and create individual statusbars for
    //TODO: FIX -> coins, health & bottles




    constructor() {
        super();
    }

    drawStatusText() {
        // Idee: da die Statusbalken nur alle 20 punkte z.B. ein neues Bild haben
        // evtl. einen Statustext direkt neben dem balken anzeigen wieviel hp punkte, coins oder flaschen man hat
    }

    setHealthPercentage(healthPercentage) {
        //TODO: FIX -> fix healthPercantage, mby do a custom variable for all 3 bars
        //TODO: FIX -> so it is a StatusBar Template, usable to generate custom
        //TODO: FIX -> StatusBars for different things
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