class Chicken extends MovableObject {
    // positionY = 540;
    // height = 100;
    // width = 100;

    // CHICKEN_IMAGES_WALKING_PATH = [
    // './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    // './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    // './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    // ];

    // constructor() {
    //     super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    //     this.loadImages(this.CHICKEN_IMAGES_WALKING_PATH);

    //     this.positionX = this.randomChickenPosition(); 
    //     this.movingSpeed = 1.5 + Math.random() * 1.25;

    //     this.animate();
    // }

    animate(images) {
        setInterval(() => {
            this.movingLeft();

            if(this.positionX < -25) {
                this.positionX += this.randomChickenPosition();
            }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(images);
        }, 250);
    }

    randomChickenPosition() {
        return 800 + Math.random() * 10000;
    }
}   