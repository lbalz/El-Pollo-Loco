class ThrowableObject extends MovableObject {

    constructor(posX, posY) {
        super();
        this.loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.positionX = 100;
        this.positionY = 100;
        this.height = 100;
        this.width = 100;
        this.throwBottle(posX, posY);
    }

    throwBottle(posX, posY) {
        this.positionX = posX;
        this.positionY = posY;
        this.speedPosY = 40;
        this.applyGravity();
        setInterval( () => {
            this.positionX += 20;
        }, 50);
    }
}