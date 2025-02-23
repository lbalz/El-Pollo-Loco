class MovableObject extends DrawableObject {
    movingSpeed = 0.25;
    otherDirection = false;
    speedPosY = 0;
    characterAcceleration = 2.5; // Beschleunigung
    healthPoints = 100;
    lastHit = 0;
    coins = 0;
    lastCoinHit = 0;
    bottles = 0;
    lastBottlesHit = 0;
    endbossHealth = 250;
    bottleDamage = 25;



    constructor() {
        super();
    }


    isColliding(movableObject) {
        return this.positionX + this.width - this.offset.right > movableObject.positionX + movableObject.offset.left &&
            this.positionY + this.height - this.offset.bottom > movableObject.positionY + movableObject.offset.top &&
            this.positionX + this.offset.left < movableObject.positionX + movableObject.width - movableObject.offset.right &&
            this.positionY + this.offset.top < movableObject.positionY + movableObject.height - movableObject.offset.bottom;
    }

    collectCoin() {
        let collectCoinAudio = new Audio('./audio/collect_coin.mp3');
        collectCoinAudio.play();
        this.coins += 1;
    }

    collectBottle() {
        let collectBottleAudio = new Audio('./audio/collect_bottle.mp3');
        collectBottleAudio.play();
        this.bottles += 1;
    }

    getHit() {
        this.healthPoints -= 5;

        if (this.healthPoints < 0) {
            this.healthPoints = 0;
        } else {
            this.lastHit = new Date().getTime(); // Time in ms since 01.01.1970
        }

    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 0.5;
    }

    isDead() {
        return this.healthPoints == 0;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isNotOnGround() || this.speedPosY > 0) {
                this.positionY -= this.speedPosY;
                this.speedPosY -= this.characterAcceleration;
            }
        }, 1000 / 25);
    }

    isNotOnGround() {
        if (this instanceof ThrowableObject) { // Throwable Objects shoulds always falls
            return true;
        } else {
            return this.positionY < 250;
        }
    }

    playAnimation(images) {
        let imagesIndex = this.currentImage % images.length;
        let imagePath = images[imagesIndex];
        this.image = this.imageCache[imagePath];
        this.currentImage++;
    }

    movingRight() {
        if (this.healthPoints <= 0) return;
        this.positionX += this.movingSpeed;
    }

    movingLeft() {
        if (this.healthPoints <= 0) return;
        this.positionX -= this.movingSpeed;
    }

    jump() {
        if (this.healthPoints <= 0) return;
        this.speedPosY = 35;
    }
}