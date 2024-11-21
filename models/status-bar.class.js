class StatusBar extends DrawableObject {
    constructor() {
        super();
    }

    

    setHealthPercentage(healthPercentage) {
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

    setEndbossHealthPercentage(endbossHealthPercentage) {
        this.endbossHealthPercentage = endbossHealthPercentage;

        let path = this.ENDBOSS_HEALTH_POINTS_IMAGES[this.getEndbossHealthImageIndex()];
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
    getBottleImageIndex() {
        if (this.bottlesPercentage >= 10) {
            return 5;
        } else if (this.bottlesPercentage >= 8) {
            return 4;
        } else if (this.bottlesPercentage >= 6) {
            return 3;
        } else if (this.bottlesPercentage >= 4) {
            return 2;
        } else if (this.bottlesPercentage >= 2) {
            return 1;
        } else {
            return 0;
        }
    }

    getEndbossHealthImageIndex() {
        if (this.endbossHealthPercentage >= 200) {
            return 5;
        } else if (this.endbossHealthPercentage >= 150) {
            return 4;
        } else if (this.endbossHealthPercentage >= 100) {
            return 3;
        } else if (this.endbossHealthPercentage >= 50) {
            return 2;
        } else if (this.endbossHealthPercentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}