class MovableObject {
    positionX = 120;
    positionY = 280;
    image;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    movingSpeed = 0.15;
    otherDirection = false;
    speedPosY = 0;
    characterAcceleration = 2.5; // Beschleunigung


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

    loadImage(path) {
        this.image = new Image(); // creates new <img> Tag
        this.image.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        console.log(this.imageCache)
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

    playAnimation(images) {
        let imagesIndex = this.currentImage % images.length;
        let imagePath = images[imagesIndex];
        this.image = this.imageCache[imagePath];
        this.currentImage++;
    }
}