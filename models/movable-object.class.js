class MovableObject {
    positionX = 120;
    positionY = 280;
    image;
    height = 150;
    width = 100;
    imageCache = {};

    // constructor(x, y, img) {
    //     this.positionX = x;
    //     this.positionY = y;
    //     this.image = img;
    // }


    loadImage(path) {
        this.image = new Image(); // creates new <img> Tag
        this.image.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
        console.log(this.imageCache)
    }

    moveRight() {
        console.log("Moving right!");
    }

    moveLeft() {
        console.log("Moving left!");
    }
}