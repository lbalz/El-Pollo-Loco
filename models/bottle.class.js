//TODO: Throwable Object is for the thrown bottle
class Bottle extends DrawableObject {
    positionX = 300;
    positionY = 550;
    width = 100;
    height = 100;

    offset = {
        top: 20,
        right: 25,
        bottom: 10,
        left: 25
    };

    //! TODO: Need collision detections for Bottles to collect 
    constructor(randomPosX) {
        super();
        this.loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.positionX = randomPosX;
    }
}