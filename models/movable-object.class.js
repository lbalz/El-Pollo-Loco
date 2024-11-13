class MovableObject extends DrawableObject{
    movingSpeed = 0.25;
    otherDirection = false;
    speedPosY = 0;
    characterAcceleration = 2.5; // Beschleunigung
    healthPoints = 100;
    lastHit = 0;


    constructor() {
        super();
    }

    

    isColliding(movableObject) {
        return this.positionX + this.width > movableObject.positionX &&
            this.positionY + this.height > movableObject.positionY &&
            this.positionX < movableObject.positionX &&
            this.positionY < movableObject.positionY + movableObject.height;
    }

    getHit() {
        this.healthPoints -= 5;
        
        if(this.healthPoints < 0) {
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
            if(this.isNotOnGround() || this.speedPosY > 0) {
                this.positionY -= this.speedPosY;
                this.speedPosY -= this.characterAcceleration;
            }
        }, 1000 / 25);
    }

    isNotOnGround() {
        return this.positionY < 250;
    }

    playAnimation(images) {
        let imagesIndex = this.currentImage % images.length;
        let imagePath = images[imagesIndex];
        this.image = this.imageCache[imagePath];
        this.currentImage++;
    }

    movingRight() {
        this.positionX += this.movingSpeed;
    }

    movingLeft() {
        this.positionX -= this.movingSpeed;
    }

    jump() {
        this.speedPosY = 35;
    }
}