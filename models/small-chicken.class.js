class SmallChicken extends Chicken {
    positionY = 565;
    height = 75;
    width = 75;

    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };

    SMALL_CHICKEN_IMAGES_WALKING_PATH = [
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.SMALL_CHICKEN_IMAGES_WALKING_PATH);

        this.positionX = this.randomChickenPosition(); 
        this.movingSpeed = 1.5 + Math.random() * 1.25;

        this.animate(this.SMALL_CHICKEN_IMAGES_WALKING_PATH);
    }
}