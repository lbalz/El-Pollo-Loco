class BackgroundObject extends MovableObject {

    width = 1080;
    height = 720;

    constructor(imagePath, positionX) {
        super().loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = 720 - this.height;
    }
}