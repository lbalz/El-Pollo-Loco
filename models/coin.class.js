class Coin extends DrawableObject {
    positionX = 300;
    positionY = 500;
    width = 100;
    height = 100;
    numOfCoins = 0;

    constructor(numOfCoins) {
        super()
        this.loadImage('../img/8_coin/coin_1.png');
        this.numOfCoins = numOfCoins;

        
    }
}