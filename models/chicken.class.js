class Chicken extends MovableObject {
    positionY = 540;
    height = 100;
    width = 100;

    CHICKEN_IMAGES_WALKING_PATH = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_IMAGES_WALKING_PATH);

        this.positionX = 200 + Math.random() * 500; // Zahl zwischen 200 - 700
        this.movingSpeed = 0.15 + Math.random() * 1.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.movingLeft();

            if(this.positionX < -490) {
                this.positionX += 1550;
            }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.CHICKEN_IMAGES_WALKING_PATH);
        }, 250);
    }
}   