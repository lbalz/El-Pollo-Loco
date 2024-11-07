class MovableObject {
    positionX = 120;
    positionY = 285;
    image;
    height = 150;
    width = 100;

    // constructor(x, y, img) {
    //     this.positionX = x;
    //     this.positionY = y;
    //     this.image = img;
    // }


    loadImage(path) {
        this.image = new Image(); // creates new <img> Tag
        this.image.src = path;
    }

    moveRight() {
        console.log("Moving right!");
    }

    moveLeft() {
        console.log("Moving left!");
    }
}