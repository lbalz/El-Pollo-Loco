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

        let path = this.HEALTH_POINTS_IMAGES[this.getHealthImageIndex()];
        this.image = this.imageCache[path];
    }

    setCoinsPercentage(coinsPercentage) {
        this.coinsPercentage = coinsPercentage;

        let path = this.COINS_IMAGES[this.getCoinImageIndex()];
        this.image = this.imageCache[path];
    }

    setBottlesPercentage(bottlesPercentage) {
        this.bottlesPercentage = bottlesPercentage;

        let path = this.BOTTLE_IMAGES[this.getBottleImageIndex()];
        this.image = this.imageCache[path];
    }

    // 100 healthPoints
    getHealthImageIndex() {
        if (this.healthPercentage >= 100) {
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

    // 20 Coins
    getCoinImageIndex() {
        if (this.coinsPercentage >= 20) {
            return 5;
        } else if (this.coinsPercentage >= 16) {
            return 4;
        } else if (this.coinsPercentage >= 12) {
            return 3;
        } else if (this.coinsPercentage >= 8) {
            return 2;
        } else if (this.coinsPercentage >= 4) {
            return 1;
        } else {
            return 0;
        }
    }

    // 10 Bottles
}