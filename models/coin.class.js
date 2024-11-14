class Coin extends DrawableObject {
    positionX = 300;
    positionY = 500;
    width = 225;
    height = 225;
    numOfCoins = 0;

    constructor(randomPosX, randomPosY) {
        super()
        this.loadImage('../img/8_coin/coin_1.png');
        this.numOfCoins = numOfCoins;
        this.positionX = randomPosX;
        this.positionY = randomPosY;
        this.numOfCoins++;
    }
}