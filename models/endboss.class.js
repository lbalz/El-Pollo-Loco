class Endboss extends MovableObject {
    height = 650;
    width = 450;
    positionY = 50;

    ENDBOSS_IMAGES_WALKING_PATH = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH = [
        '../img/4_enemie_boss_chicken/1_walk/G5.png',
        '../img/4_enemie_boss_chicken/1_walk/G6.png',
        '../img/4_enemie_boss_chicken/1_walk/G7.png',
        '../img/4_enemie_boss_chicken/1_walk/G8.png',
        '../img/4_enemie_boss_chicken/1_walk/G9.png',
        '../img/4_enemie_boss_chicken/1_walk/G10.png',
        '../img/4_enemie_boss_chicken/1_walk/G11.png',
        '../img/4_enemie_boss_chicken/1_walk/G12.png',
    ];


    constructor() {
        super().loadImage(this.ENDBOSS_IMAGES_WALKING_PATH[1]);
        this.loadImages(this.ENDBOSS_IMAGES_WALKING_PATH);
        this.positionX = 700;
        this.animateWalkingChickenEndboss();
    }

    animateWalkingChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_WALKING_PATH);
        }, 200);
    }

    animateAngryChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH);
        }, 200);
    }
}