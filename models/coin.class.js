class Coin extends DrawableObject {
    positionX = 300;
    positionY = 500;
    width = 225;
    height = 225;

    //! TODO: Need collision detections for Coins to collect 
    constructor(randomPosX, randomPosY) {
        super()
        this.loadImage('../img/8_coin/coin_1.png');
        this.positionX = randomPosX;
        this.positionY = randomPosY;
    }
}